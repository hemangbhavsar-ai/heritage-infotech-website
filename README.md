# Heritage InfoTech Website

React + Vite marketing site with Decap CMS. Manual Netlify deploys (Free plan credits).

| Environment | URL |
|---|---|
| Production | https://heritageinfotech.com |
| Non-prod | https://heritage-infotech-nonprod.netlify.app |
| Dev subdomain | https://dev.heritageinfotech.com |
| Local | http://localhost:5173 |

Repo: https://github.com/hemangbhavsar-ai/heritage-infotech-website

## Run locally

```bash
npm install
npm run dev          # public site → http://localhost:5173
```

In a **second** terminal:

```bash
npx decap-server     # local CMS backend → port 8081
```

Then open:

- Site: http://localhost:5173
- Leadership: http://localhost:5173/about/leadership
- Admin: http://localhost:5173/admin → click **Login** (no email/password)

Always use `/admin/` (trailing slash). `/admin` redirects there.

```bash
npm run test:e2e     # Playwright crawl of public pages + local admin
npm run build        # production build → dist/
```

## Edit content (CMS)

Content lives in `content/*.json`. Images live in `public/images/`.

| File | Controls |
|---|---|
| `content/site.json` | Company name, phone, email, logos |
| `content/home.json` | Hero banner (carousel), highlights, services, quantum section, CTA |
| `content/leadership.json` | Executive bios and photo paths |
| `content/timeline.json` | Company milestones |
| `content/industries.json` | Client pages by industry |
| `content/pages.json` | Vision, services, contact, quote |

**Local:** `/admin` → Login → edit → Publish (writes files on disk).

- Hero banner (the scrolling home banner / carousel): **Home Page → Homepage Content → Hero Banner**
- Leadership photos: **About Us → Leadership Team** (initials SVGs are placeholders; upload JPGs later)

**Published admin** uses Netlify Identity (invite-only) + Git Gateway.

- Prod: https://heritageinfotech.com/admin
- Non-prod: https://heritage-infotech-nonprod.netlify.app/admin (or https://dev.heritageinfotech.com/admin after HTTPS)

Invite users in the Netlify project → Identity. Prod and non-prod have **separate** logins. After invite, set password, then sign in.

If Git Gateway cannot save, reconnect it: Netlify project → Identity → Services → Git Gateway.

## Push code (Git)

```bash
git add -A
git commit -m "Describe the change"
git push origin main
```

Pushing to GitHub does **not** publish the site. Auto-builds are **off** on both Netlify projects (`stop_builds: true`) so Free-plan credits are not spent on every commit.

## Publish to Netlify

**Free plan = 300 credits / month (hard cap).**  
A **published** deploy costs **15 credits** (prod or non-prod). Drafts/previews cost **0**. Failed/cancelled deploys cost **0**. Bandwidth is 20 credits/GB; requests are 2 credits / 10k.

Typical month for this site: 1–3 publishes + light traffic ≈ 50–90 credits.

**August 2026 (so far):** 2 published deploys (non-prod + prod on 13 Aug) = **30 credits**. Bandwidth ~16.9 MB (~0.3 credits). Netlify Analytics is off, so there is no exact request counter; at 2 credits / 10k requests, traffic is tiny. **About 270 of 300 credits left** until 1 Sep 2026.

**Do not spend 15 credits just for `/admin` security headers.** Those headers are already in `netlify.toml` and will go live on the **next real content deploy**. Reminder: next time we publish, mention “ship `/admin` headers (X-Robots-Tag, X-Frame-Options, nosniff).”

### Option A — GitHub Actions (manual)

1. GitHub repo → **Actions**
2. **Deploy Non-Prod (Netlify)** → Run workflow → review https://dev.heritageinfotech.com
3. **Deploy Production (Netlify)** → Run workflow (needs approval)

### Option B — CLI

```bash
npm run build

# Non-prod (15 credits when published)
npx netlify deploy --dir=dist --site=heritage-infotech-nonprod --prod

# Production (15 credits) — only after non-prod looks good
npx netlify deploy --dir=dist --site=heritage-infotech --prod
```

Do **not** turn auto-publish back on. That would spend 15 credits on every push.

## DNS (Cloudflare)

Registrar/DNS: Cloudflare (`heritageinfotech.com`).

| Host | Record | Target |
|---|---|---|
| `@` | A | Netlify IPs (prod) |
| `www` | CNAME | `heritage-infotech.netlify.app` |
| `dev` | CNAME | `heritage-infotech-nonprod.netlify.app` — **DNS only** (grey cloud) |

Netlify projects:

- `heritage-infotech` → `heritageinfotech.com`
- `heritage-infotech-nonprod` → `dev.heritageinfotech.com`

Let’s Encrypt on `dev` can take a few minutes after the CNAME exists. Until then use https://heritage-infotech-nonprod.netlify.app.

## CI / CD

| Item | Behavior |
|---|---|
| `.github/workflows/deploy-nonprod.yml` | Manual only (`workflow_dispatch`) |
| `.github/workflows/deploy-prod.yml` | Manual only + GitHub environment approval |
| Netlify Git auto-build | Off on both sites |
| Secrets | `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`, `NETLIFY_SITE_ID_NONPROD` |

## Tech stack

- React 19 + TypeScript + Vite 8
- Tailwind CSS 4
- React Router 7
- Lucide icons
- Decap CMS 3 (`public/admin/`) + `decap-server` locally
- Playwright e2e (`npm run test:e2e`)
- Netlify: hosting, Identity, Git Gateway, Forms
- Cloudflare: DNS for `heritageinfotech.com` and `dev`

Phone (site-wide): `1 (888) 734-3240`
