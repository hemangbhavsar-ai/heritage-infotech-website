import { Link } from 'react-router-dom'
import { FacebookIcon, LinkedInIcon, TwitterIcon, YouTubeIcon } from './SocialIcons'
import { Logo } from './Logo'
import { site } from '../lib/content'

const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'Our Vision', path: '/about/vision' },
  { label: 'Timeline', path: '/about/timeline' },
  { label: 'Leadership', path: '/about/leadership' },
  { label: 'Cybersecurity', path: '/services/cybersecurity' },
  { label: 'Clients', path: '/about/clients' },
  { label: 'Get a Quote', path: '/get-quote' },
  { label: 'Contact', path: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-4">
              <Logo variant="dark" className="h-12 w-auto max-w-[250px]" />
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Delivering technology solutions, staffing excellence, and business process outsourcing
              for enterprises nationwide.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm transition hover:text-brand-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Connect</h3>
            <a href={`mailto:${site.email}`} className="text-sm text-brand-400 hover:text-brand-300">
              {site.email}
            </a>
            <div className="mt-4 flex gap-3">
              <a href={site.social.linkedin} className="rounded-md bg-slate-800 p-2 transition hover:bg-brand-500" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href={site.social.twitter} className="rounded-md bg-slate-800 p-2 transition hover:bg-brand-500" aria-label="Twitter">
                <TwitterIcon />
              </a>
              <a href={site.social.facebook} className="rounded-md bg-slate-800 p-2 transition hover:bg-brand-500" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href={site.social.youtube} className="rounded-md bg-slate-800 p-2 transition hover:bg-brand-500" aria-label="YouTube">
                <YouTubeIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 bg-brand-600 py-4 text-center text-sm text-white">
        {site.copyright}
      </div>
    </footer>
  )
}