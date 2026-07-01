import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { site } from '../lib/content'

const navItems = [
  { label: 'Home', path: '/' },
  {
    label: 'About Us',
    children: [
      { label: 'Our Vision', path: '/about/vision' },
      { label: 'Clients', path: '/about/clients' },
    ],
  },
  {
    label: 'Services',
    children: [
      { label: 'IT Professional Services', path: '/services/it-professionals' },
      { label: 'Logistic Solutions Suite', path: '/services/logistics' },
      { label: 'Staffing Solutions', path: '/services/staffing' },
      { label: 'Business Process Outsourcing', path: '/services/bpo' },
    ],
  },
  {
    label: 'Contact',
    children: [
      { label: 'Enquiry Form', path: '/enquiry' },
      { label: 'Contact Us', path: '/contact' },
    ],
  },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500 font-bold text-white transition group-hover:bg-brand-400">
            HI
          </div>
          <div className="hidden sm:block">
            <div className="text-lg font-semibold leading-tight">Heritage InfoTech</div>
            <div className="text-xs text-brand-300">{site.tagline}</div>
          </div>
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
                  <div className="absolute left-0 top-full min-w-[240px] rounded-md border border-slate-700 bg-slate-800 py-2 shadow-xl">
                    {item.children.map((child) => (
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
                    ))}
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
          to="/enquiry"
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
        <nav className="border-t border-slate-700 bg-slate-900 px-4 py-4 lg:hidden">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="mb-2">
                <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-brand-400">
                  {item.label}
                </div>
                {item.children.map((child) => (
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
                ))}
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
            to="/enquiry"
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