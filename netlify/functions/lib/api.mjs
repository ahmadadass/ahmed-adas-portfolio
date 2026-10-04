import { createHmac, timingSafeEqual, createHash } from 'node:crypto';
import { validateContent } from './validation.mjs';
const json=(value,status=200,extra={})=>new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...extra}});
const hash=s=>createHash('sha256').update(String(s)).digest();
const equal=(a,b)=>timingSafeEqual(hash(a),hash(b));
export function createAPI({env=process.env,fetchImpl=fetch,store=null,secure=true}={}){
 const sign=s=>createHmac('sha256',env.SESSION_SECRET).update(s).digest('base64url');
 const cookie=(v,age=7200)=>`aa_session=${v}; HttpOnly; SameSite=Strict; Path=/api/; Max-Age=${age}${secure?'; Secure':''}`;
 function authenticated(req){let token=(req.headers.get('cookie')||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('aa_session='))?.slice(11);if(!token)return false;let [payload,sig]=token.split('.');if(!payload||!sig||!equal(sig,sign(payload)))return false;try{let p=JSON.parse(Buffer.from(payload,'base64url'));return p.exp>Date.now()&&p.exp<Date.now()+7300000&&p.user==='owner'}catch{return false}}
 async function github(method,body,raw=false){if(!env.GITHUB_TOKEN||!env.GITHUB_REPOSITORY||!env.GITHUB_BRANCH)throw Object.assign(Error('Configure the GitHub connection in Netlify before editing projects.'),{status:503});if(!/^[\w.-]+\/[\w.-]+$/.test(env.GITHUB_REPOSITORY))throw Object.assign(Error('Invalid repository configuration.'),{status:503});const base=`https://api.github.com/repos/${env.GITHUB_REPOSITORY}/contents/public/content.json`;const r=await fetchImpl(base+(method==='GET'?`?ref=${encodeURIComponent(env.GITHUB_BRANCH)}`:''),{method,headers:{Authorization:`Bearer ${env.GITHUB_TOKEN}`,Accept:raw?'application/vnd.github.raw+json':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','User-Agent':'Ahmed-Adas-Portfolio','Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});if(!r.ok)throw Object.assign(Error(r.status===409||r.status===422?'Content changed or the branch rejected the update. Reload before saving.':'GitHub could not complete the request. Check repository, branch and token permissions.'),{status:r.status===409||r.status===422?409:502});return raw?r.text():r.json()}
 return async req=>{try{
  if(!env.ADMIN_PASSWORD||env.ADMIN_PASSWORD.length<20||!env.SESSION_SECRET||env.SESSION_SECRET.length<32||!env.SITE_ORIGIN)return json({error:'The private editor needs its environment settings. Follow SETUP.md.'},503);
  let path=new URL(req.url).pathname,method=req.method;
  if(!['GET','POST','PUT'].includes(method))return json({error:'Method not allowed.'},405);
  if(method!=='GET'&&req.headers.get('origin')!==env.SITE_ORIGIN)return json({error:'Request origin rejected.'},403);
  let body={};if(method!=='GET'){if(!req.headers.get('content-type')?.startsWith('application/json'))return json({error:'JSON required.'},415);if(Number(req.headers.get('content-length')||0)>3900000)return json({error:'Content is too large. Use smaller images.'},413);const raw=await req.text();if(Buffer.byteLength(raw)>3900000)return json({error:'Content is too large. Use smaller images.'},413);try{body=JSON.parse(raw)}catch{return json({error:'Invalid JSON.'},400)}}
  if(path==='/api/login'&&method==='POST'){if(typeof body.password!=='string'||body.password.length>500||!equal(body.password,env.ADMIN_PASSWORD))return json({error:'Incorrect password.'},401);const payload=Buffer.from(JSON.stringify({user:'owner',exp:Date.now()+7200000})).toString('base64url');return json({ok:true},200,{'Set-Cookie':cookie(`${payload}.${sign(payload)}`)})}
  if(path==='/api/logout'&&method==='POST')return json({ok:true},200,{'Set-Cookie':cookie('',0)});
  if(!authenticated(req))return json({error:'Please sign in.'},401);
  if(path==='/api/session'&&method==='GET')return json({ok:true});
  if(path==='/api/projects'&&method==='GET'){if(store)return json(await store.read());let doc=await github('GET');const raw=doc.encoding==='base64'?Buffer.from(doc.content.replace(/\s/g,''),'base64').toString('utf8'):await github('GET',undefined,true);return json({sha:doc.sha,data:JSON.parse(raw)})}
  if(path==='/api/projects'&&method==='PUT'){const clean=validateContent(body.data);if(typeof body.sha!=='string'||!body.sha)return json({error:'Reload the current content before saving.'},400);if(store){await store.write(clean,body.sha);return json({ok:true,message:'Saved locally for testing.'})}let result=await github('PUT',{message:'Update portfolio projects from private dashboard',content:Buffer.from(JSON.stringify(clean,null,2)+'\n').toString('base64'),sha:body.sha,branch:env.GITHUB_BRANCH});return json({ok:true,sha:result.content.sha,message:'Saved to GitHub. Netlify will publish the update when its deployment completes.'})}
  return json({error:'Not found.'},404);
 }catch(e){return json({error:e.status?e.message:'The request failed. Please try again.'},e.status||500)}};
}
