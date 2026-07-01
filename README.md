# Heritage InfoTech Website

Modern, responsive consulting firm website built with React, Tailwind CSS, and Decap CMS.

## Quick Start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

## Pages

| Route | Content |
|-------|---------|
| `/` | Home with hero carousel, highlights, services |
| `/about/vision` | Company vision and values |
| `/about/clients` | Client industries |
| `/services/it-professionals` | IT consulting & staffing |
| `/services/logistics` | Route planning suite |
| `/services/staffing` | MSP/VMS staffing |
| `/services/bpo` | Business process outsourcing |
| `/contact` | Contact information |
| `/enquiry` | Enquiry form |
| `/admin` | Content management (Decap CMS) |

## Content Management (Decap CMS)

All editable content lives in `content/*.json`. Edit via the CMS admin or directly in files.

### Local CMS Preview

```bash
npx decap-server    # in one terminal
npm run dev         # in another terminal
# Open http://localhost:5173/admin
```

### Production CMS (after Netlify deploy)

1. Deploy to Netlify (see below)
2. Enable **Identity** in Netlify dashboard → Invite Users
3. Enable **Git Gateway** under Identity settings
4. Visit `https://yoursite.com/admin` and log in
5. Edit content → Publish → site rebuilds automatically

### What You Can Edit

- **Site Settings** — company name, tagline, email, social links
- **Home Page** — hero slides, highlights, service cards, CTA
- **All Pages** — vision, clients, services, contact text

## Free Deployment Options (10–200 users/month)

| Platform | Cost | Best For | Notes |
|----------|------|----------|-------|
| **Netlify** (recommended) | Free | CMS + hosting | Includes Identity + Git Gateway for Decap CMS. 100 GB bandwidth/mo. |
| **Cloudflare Pages** | Free | Speed & scale | Unlimited bandwidth. Use with Decap CMS via GitHub backend. |
| **Vercel** | Free | Fast deploys | 100 GB bandwidth. Good alternative; CMS needs GitHub OAuth setup. |
| **GitHub Pages** | Free | Simplest | No built-in CMS auth; edit JSON in GitHub UI. |

### Recommended: Netlify Deploy

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com) → Add new site → Import from Git
3. Build command: `npm run build` | Publish directory: `dist`
4. Deploy → Site Settings → Identity → Enable Identity
5. Identity → Services → Enable Git Gateway
6. Identity → Invite Users → add your email
7. Domain: connect `heritageinfotech.com` in Domain Settings

### Connect Custom Domain

In your domain registrar, point DNS to Netlify:
- `A` record → `75.2.60.5`
- `CNAME` for `www` → `yoursite.netlify.app`

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS 4
- React Router 7
- Lucide React icons (professional UI icons)
- Decap CMS (free, open-source, Git-based)