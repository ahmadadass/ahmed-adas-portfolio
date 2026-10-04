# Publish on GitHub + Netlify

## 1. Create the repository

Create a repository in your GitHub account, for example `ahmed-adas-portfolio`. Upload the contents of this folder at the repository root: `package.json`, `netlify.toml`, `public/`, `netlify/`, `scripts/` and `tests/`.

Do not upload `.env`, `.local-content.json`, or local credentials. Do not upload only `dist/`.

## 2. Connect Netlify

In your Netlify account, import the GitHub repository as a new project. The included configuration uses:

- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`
- Node.js: 22

Deploy once and copy the site's actual HTTPS address. Your Netlify team dashboard URL is not the public website address.

## 3. Enable the private dashboard

Create a fine-grained GitHub personal access token. Restrict it to **this portfolio repository only**, with **Contents: read and write**. Select an expiry and renew it when needed. No access to your other repositories is necessary. The chosen branch must permit direct content commits; use a dedicated portfolio repository or adjust its workflow if branch rules require pull requests.

In Netlify's project environment variables, set the following values with **Functions** scope. Do not put these values into frontend files or `netlify.toml`:

| Variable | Value |
| --- | --- |
| `ADMIN_PASSWORD` | A unique randomly generated password of at least 20 characters |
| `SESSION_SECRET` | An independent random secret of at least 32 characters |
| `GITHUB_TOKEN` | The repository-scoped token described above |
| `GITHUB_REPOSITORY` | `ahmadadass/ahmed-adas-portfolio`, or your actual owner/repository |
| `GITHUB_BRANCH` | `main`, or your actual deployment branch |
| `SITE_ORIGIN` | The exact HTTPS website origin, such as `https://your-name.netlify.app`, without a trailing slash |

Generate independent random values locally, running this command separately for the password and session secret:

```sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"
```

Save the password in your password manager. Redeploy after changing environment settings. The API deliberately refuses to work until the required settings exist. Do not paste your password, secret or token into chat.

## 4. Check the dashboard

Open `https://YOUR-SITE.netlify.app/admin/` and sign in with `ADMIN_PASSWORD`.

1. Edit a project summary in both languages.
2. Click **Publish changes**.
3. Check that a commit appears on GitHub.
4. Wait for the linked Netlify deployment to succeed.
5. Refresh the public site and verify the update.

The dashboard saves the entire project list as one commit. If the file changed elsewhere, it refuses to overwrite a stale version; reload the saved version, then reapply your edits. If you are approaching the upload budget, use smaller images or HTTPS image URLs. Avoid temporary signed image URLs that expire.

The initial two case studies and every additional project are editable here. Contact information, About, Services and CV are edited in source; this dashboard is intentionally a **project editor**.

## 5. Security and operation

Sessions use signed, Secure, HttpOnly, SameSite=Strict cookies and expire after two hours. Write requests check the configured origin. The function declares 20 requests per IP/domain per 60 seconds; verify that the rule appears in Netlify's deploy post-processing log, since platform rule errors do not necessarily fail deployment. The frontend never receives the GitHub token or password. Rotating `SESSION_SECRET` invalidates existing sessions. Changing only the password does not invalidate an already issued session.

Use the configured production origin for editing. Preview deploy domains will not be able to submit changes unless deliberately configured as a separate environment. If you add a custom domain later, update `SITE_ORIGIN` to the canonical domain you use for the dashboard and redeploy.

The login screen itself is publicly reachable; server authentication protects reads of editor state and all writes. Public project content remains public by design. Local development credentials and the local data adapter are not production authentication.

The site opens WhatsApp with +972593407569 as requested, even though the user's country code is +970. Telegram is `@ahmadA0301`, and email is `adass0301@gmail.com`.

## Official references

- Netlify functions and environment variables: https://docs.netlify.com/build/functions/environment-variables/
- Netlify file-based build configuration: https://docs.netlify.com/build/configure-builds/file-based-configuration/
- Netlify code-based rate limits: https://docs.netlify.com/manage/security/secure-access-to-sites/rate-limiting/
- GitHub repository contents API and token permissions: https://docs.github.com/en/rest/repos/contents

## دليل سريع بالعربية

1. أنشئ مستودعًا في GitHub وارفع محتويات المشروع كاملة في جذره.
2. اربط المستودع بمشروع جديد في Netlify؛ يحدد ملف `netlify.toml` إعدادات البناء والنشر.
3. أضف المتغيرات الستة الموضحة أعلاه إلى إعدادات Netlify، بنطاق Functions، ثم أعد النشر.
4. افتح `/admin/` وسجل الدخول بكلمة المرور التي اخترتها.
5. عدّل المشاريع واضغط Publish changes. بعد نجاح نشر Netlify ستظهر التعديلات للجمهور.

لا ترسل كلمات المرور أو مفاتيح الوصول في المحادثة. لوحة التحكم تدير المشاريع، أما السيرة وبيانات التواصل فتُعدّل من ملفات المصدر.
