import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Logo } from './Logo'

type NavChild = { label: string; path: string } | { divider: true; label: string }

const navItems: Array<{ label: string; path?: string; children?: NavChild[] }> = [
  { label: 'Home', path: '/' },
  {
    label: 'About Us',
    children: [
      { label: 'Our Vision', path: '/about/vision' },
      { label: 'Timeline', path: '/about/timeline' },
      { label: 'Leadership', path: '/about/leadership' },
      { divider: true, label: 'Clients by Industry' },
      { label: 'All Clients', path: '/about/clients' },
      { label: 'Healthcare', path: '/about/clients/healthcare' },
      { label: 'Financial Services', path: '/about/clients/financial' },
      { label: 'Technology', path: '/about/clients/technology' },
      { label: 'Logistics & Supply Chain', path: '/about/clients/logistics' },
      { label: 'Government', path: '/about/clients/government' },
      { label: 'Manufacturing', path: '/about/clients/manufacturing' },
    ],
  },
  {
    label: 'Services',
    children: [
      { label: 'IT Professional Services', path: '/services/it-professionals' },
      { label: 'Cybersecurity & Quantum Readiness', path: '/services/cybersecurity' },
      { label: 'Logistic Solutions Suite', path: '/services/logistics' },
      { label: 'Staffing Solutions', path: '/services/staffing' },
      { label: 'Business Process Outsourcing', path: '/services/bpo' },
    ],
  },
  {
    label: 'Contact',
    children: [
      { label: 'Get a Quote', path: '/get-quote' },
      { label: 'Enquiry Form', path: '/enquiry' },
      { label: 'Contact Us', path: '/contact' },
    ],
  },
]

function isDivider(item: NavChild): item is { divider: true; label: string } {
  return 'divider' in item
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center" onClick={() => setMobileOpen(false)}>
          <Logo variant="mark" className="h-10 w-10 sm:hidden" />
          <Logo variant="dark" className="hidden h-11 w-auto max-w-[280px] sm:block lg:max-w-[320px]" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-white">
                  {item.label}
                  <ChevronDown size={14} />
                </button>
                {openDropdown === item.label && (
                  <div
                    className={`absolute left-0 top-full rounded-md border border-slate-700 bg-slate-800 py-2 shadow-xl ${
                      item.label === 'About Us' ? 'min-w-[280px]' : 'min-w-[260px]'
                    }`}
                  >
                    {item.children.map((child, i) =>
                      isDivider(child) ? (
                        <div
                          key={`div-${i}`}
                          className="mt-2 border-t border-slate-700 px-4 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-brand-400"
                        >
                          {child.label}
                        </div>
                      ) : (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) =>
                            `block px-4 py-2.5 text-sm transition hover:bg-slate-700 hover:text-white ${
                              isActive ? 'bg-slate-700 text-brand-300' : 'text-slate-300'
                            }`
                          }
                        >
                          {child.label}
                        </NavLink>
                      ),
                    )}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.path}
                to={item.path!}
                end
                className={({ isActive }) =>
                  `rounded-md px-4 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-brand-500 text-white' : 'text-slate-200 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <Link
          to="/get-quote"
          className="hidden rounded-md bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-400 lg:inline-block"
        >
          Get a Quote
        </Link>

        <button
          className="rounded-md p-2 text-slate-200 hover:bg-slate-800 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="max-h-[70vh] overflow-y-auto border-t border-slate-700 bg-slate-900 px-4 py-4 lg:hidden">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="mb-2">
                <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-brand-400">
                  {item.label}
                </div>
                {item.children.map((child, i) =>
                  isDivider(child) ? (
                    <div key={`mdiv-${i}`} className="px-3 py-2 text-xs font-medium text-slate-500">
                      {child.label}
                    </div>
                  ) : (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-md px-3 py-2.5 text-sm ${
                          isActive ? 'bg-slate-800 text-brand-300' : 'text-slate-300 hover:bg-slate-800'
                        }`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ),
                )}
              </div>
            ) : (
              <NavLink
                key={item.path}
                to={item.path!}
                end
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2.5 text-sm ${
                    isActive ? 'bg-brand-500 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
          <Link
            to="/get-quote"
            onClick={() => setMobileOpen(false)}
            className="mt-4 block rounded-md bg-brand-500 px-4 py-3 text-center text-sm font-semibold text-white"
          >
            Get a Quote
          </Link>
        </nav>
      )}
    </header>
  )
}