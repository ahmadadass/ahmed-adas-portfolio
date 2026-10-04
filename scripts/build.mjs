import { cp, rm, readFile } from 'node:fs/promises';
import { validateContent } from '../netlify/functions/lib/validation.mjs';
validateContent(JSON.parse(await readFile('public/content.json','utf8')));
await rm('dist',{recursive:true,force:true});
await cp('public','dist',{recursive:true});
console.log('Built portfolio in dist/.');
