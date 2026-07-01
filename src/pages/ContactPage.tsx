import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { pages, site } from '../lib/content'

export function ContactPage() {
  const { contact } = pages

  return (
    <>
      <PageHero title={contact.title} subtitle={contact.subtitle} />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-lg leading-relaxed text-slate-600">{contact.body}</p>
              <div className="mt-10 space-y-6">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Mail size={24} strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500">Email</div>
                    <div className="font-semibold text-slate-900">{contact.email}</div>
                  </div>
                </a>
                {site.phone && (
                  <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <Phone size={24} strokeWidth={1.75} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-500">Phone</div>
                      <div className="font-semibold text-slate-900">{site.phone}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <MapPin size={24} strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500">Locations</div>
                    <div className="font-semibold text-slate-900">Nationwide — All 50 States</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-slate-900 p-8 text-white">
              <h2 className="text-xl font-semibold">Get Started Today</h2>
              <p className="mt-4 text-slate-300">
                Whether you need IT staffing, logistics solutions, or BPO services, our team is
                ready to help you achieve your business goals.
              </p>
              <Link
                to="/enquiry"
                className="mt-8 inline-flex rounded-md bg-brand-500 px-6 py-3 text-sm font-semibold transition hover:bg-brand-400"
              >
                Submit an Enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}