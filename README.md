# Heritage InfoTech Website

Modern consulting firm website — React, Tailwind CSS, Decap CMS, deployed on Netlify.

**Live site:** https://heritage-infotech.netlify.app

## Quick Start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

## Site Map

| Route | Content |
|-------|---------|
| `/` | Home |
| `/about/vision` | Company vision |
| `/about/timeline` | Milestones 2013–2026 |
| `/about/leadership` | Executive team |
| `/about/clients` | Industries overview |
| `/about/clients/healthcare` | Healthcare clients & projects |
| `/about/clients/financial` | Financial services clients |
| `/about/clients/technology` | Technology clients |
| `/about/clients/logistics` | Logistics & supply chain |
| `/about/clients/government` | Government clients |
| `/services/cybersecurity` | Quantum Readiness as a Service |
| `/services/*` | IT, Logistics, Staffing, BPO |
| `/contact` | Contact information |
| `/enquiry` | Enquiry form (Netlify Forms) |
| `/admin` | Content management panel |

## Content Management (Decap CMS)

All content lives in `content/*.json`. Images go in `public/images/`.

### Content Files

| File | What it controls |
|------|------------------|
| `content/site.json` | Company name, email, social links |
| `content/home.json` | Hero slides, highlights, service cards |
| `content/timeline.json` | Company milestones |
| `content/leadership.json` | Executive bios and photos |
| `content/industries.json` | Client pages by industry |
| `content/pages.json` | Vision, services, contact, cybersecurity |

### Replace Leadership Photos

1. Add real photos to `public/images/leadership/` (e.g. `shilpa-bhavsar.jpg`)
2. Open `/admin` → **Leadership Team** → upload or update image paths
3. Publish — site rebuilds automatically

### Edit Content via Admin Panel

**Production (recommended):**

1. Go to **https://heritage-infotech.netlify.app/admin**
2. Log in with your invited Netlify Identity email
3. Select a collection (Site Settings, Home Page, Timeline, etc.)
4. Edit fields → click **Publish**
5. Netlify rebuilds the site in ~1 minute

**Local preview:**

```bash
npx decap-server    # terminal 1
npm run dev         # terminal 2
# Open http://localhost:5173/admin
```

### Enable Admin Access (one-time)

1. [Netlify Dashboard](https://app.netlify.com/projects/heritage-infotech) → **Site configuration**
2. **Identity** → Enable Identity
3. **Identity → Services** → Enable **Git Gateway**
4. **Identity → Invite users** → add `hemang.bhavsar@gmail.com` (or your email)
5. Invited user sets password via email link
6. Log in at `/admin`

## Continuous Deployment (GitHub → Netlify)

Every push to `main` triggers an automatic Netlify rebuild.

### Setup (already configured if repo is linked)

1. Code lives in GitHub: `heritage-infotech-website` repo
2. Netlify watches the `main` branch
3. Build command: `npm run build`
4. Publish directory: `dist`

### Manual Deploy

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

## DNS Transfer to Netlify

Move `heritageinfotech.com` from your current registrar to Netlify:

### Step 1 — Add domain in Netlify

1. [Netlify Dashboard](https://app.netlify.com/projects/heritage-infotech) → **Domain management**
2. **Add a domain** → enter `heritageinfotech.com`
3. Also add `www.heritageinfotech.com`

### Step 2 — Update DNS at your registrar

Netlify will show exact records. Typically:

| Type | Name | Value |
|------|------|-------|
| `A` | `@` | `75.2.60.5` |
| `CNAME` | `www` | `heritage-infotech.netlify.app` |

### Step 3 — Enable HTTPS

Netlify auto-provisions a free Let's Encrypt certificate once DNS propagates (up to 48 hours).

### Step 4 — Set primary domain

In Netlify → **Domain management** → set `heritageinfotech.com` as primary and enable **Force HTTPS**.

### Step 5 — Update CMS URLs

After DNS is live, update `public/admin/config.yml`:

```yaml
site_url: https://heritageinfotech.com
display_url: https://heritageinfotech.com
```

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS 4
- React Router 7
- Lucide React icons
- Decap CMS (Git-based, free)
- Netlify (hosting, Identity, Forms, CD)