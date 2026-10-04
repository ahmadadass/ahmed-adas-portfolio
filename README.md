# Ahmed Adas — Portfolio

A bilingual English/Arabic developer portfolio for Ahmed Adas, ready for a GitHub-connected Netlify deployment.

## Included

- Light-first design, blue accents, dark theme, English/Arabic toggle. The overall layout stays LTR; Arabic paragraphs use proper RTL text direction.
- Five projects, with full Sooqy and LAN Messenger case studies and authentic supplied screenshots.
- Services, education, GitHub links, downloadable English PDF CV and an interactive TCP/UDP illustration.
- WhatsApp-first contact form, Telegram and email links. The form prepares a message; visitors send it themselves. Nothing is submitted automatically.
- Private project editor at `/admin/`: add, edit and remove projects; edit both languages; add screenshots and case-study sections; feature projects.
- Production edits are committed to `public/content.json` in your GitHub repository through a Netlify Function. Git-connected Netlify then rebuilds the public portfolio.
- No runtime npm dependencies, subscriptions or external font services are required by the source code. Hosting/platform usage limits still apply.

## Start locally

Install Node.js 22 or newer, open a terminal in this folder, then run:

```sh
npm run dev
```

Visit `http://localhost:4173`. Visit `/admin/` and use the temporary password printed in your terminal. Local edits are saved in `.local-content.json` (ignored by Git). They do not change your production site. To reset local edits, delete that file. To keep them for deployment, copy its content into `public/content.json` first.

```sh
npm test
npm run build
```

The build copies public assets into `dist/` after checking the content schema. The CV is already included; Python is not required to run, build or deploy the site.

**Read [SETUP.md](SETUP.md) before deploying.** A static folder upload alone cannot activate the private editor. Use a Git-connected Netlify deployment of this complete project.

## Files

- `public/index.html`, `public/style.css`, `public/app.js`: public website.
- `public/content.json`: bilingual project content.
- `public/assets/`: selected original project screenshots.
- `public/admin/`: editor interface, not the authorization boundary.
- `netlify/functions/portfolio.mjs`: server endpoint with a platform rate-limit declaration.
- `netlify/functions/lib/`: server-side authentication, GitHub publishing and content validation.
- `scripts/dev.mjs`: loopback-only local development server and local content adapter.
- `public/Ahmed-Adas-CV.pdf`: downloadable one-page English CV.
- `scripts/make_cv.py`: optional CV source; requires reportlab and DejaVu fonts. Adjust font paths for your operating system.
- `tests/api.test.mjs`: authentication, CSRF, validation, conflict and mocked GitHub integration tests.

## Content accuracy

Project details come from Ahmed's supplied answers and screenshots; application source code was not supplied or audited. Sooqy has limited user exposure, no invented adoption metrics. Neither app is described as app-store published. LAN Messenger calling was an unfinished experiment, not a shipped feature. The cancelled Qatar project is omitted. Additional web projects use restrained summaries because their detailed functionality was not supplied. All technology labels on the featured projects were supplied by Ahmed.

The site does not fetch live GitHub statistics or expose a GitHub token. GitHub integration means project/repository links and dashboard publishing. No analytics or tracking scripts are installed. Screenshot uploads are size-limited; use smaller images or HTTPS image URLs when the content budget is reached.

## Privacy of supplied assets

The public image selection omits the login screenshot with visible credentials and the customer list with phone numbers. Do not add screenshots showing secrets, private contact details or real customer records.

## Verification

The API tests use local data and a mocked GitHub service. A real GitHub commit, Netlify deployment, hosted rate-limit enforcement and live admin login must be verified after account setup. Deploy status is not inferred from a successful GitHub save: the dashboard tells you to wait for Netlify to finish.

### Checks completed for this handoff

- Build and JavaScript syntax checks passed.
- Four automated API tests passed: authorization/session cookies and origin checks; fail-closed configuration; input/URL validation; mocked GitHub read/write and large-file handling.
- Local HTTP checks passed for homepage, editor, assets, PDF, login, project creation, persistence, restoration and logout.
- Every referenced project image and local HTML link resolves to an included file.
- The one-page CV was rendered and visually inspected.
- Browser screenshots and interactive browser QA could not run because the environment had no browser executable and the browser download failed. Desktop/mobile appearance and browser interaction checks are therefore still required.
- No real repository was created or changed, and the site has not been deployed to Netlify.
