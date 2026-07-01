import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { pages, site } from '../lib/content'

export function ContactPage() {
  const { contact } = pages
  const [activeLocation, setActiveLocation] = useState(0)
  const locations = contact.locations ?? []
  const selected = locations[activeLocation]

  return (
    <>
      <PageHero title={contact.title} subtitle={contact.subtitle} />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-slate-600">
            {contact.body}
          </p>

          {locations.length > 0 && (
            <div className="mb-16">
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
                {selected && (
                  <iframe
                    key={selected.mapEmbed}
                    title={`Map — ${selected.name}`}
                    src={selected.mapEmbed}
                    className="h-[420px] w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                )}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {locations.map((location, index) => (
                  <button
                    key={location.name}
                    type="button"
                    onClick={() => setActiveLocation(index)}
                    className={`rounded-xl border p-5 text-left transition ${
                      activeLocation === index
                        ? 'border-brand-400 bg-brand-50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-brand-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          activeLocation === index
                            ? 'bg-brand-500 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                          {location.region}
                        </div>
                        <div className="mt-1 font-semibold text-slate-900">{location.name}</div>
                        <div className="mt-1 text-sm text-slate-600">{location.address}</div>
                        {location.isHeadquarters && (
                          <span className="mt-2 inline-block rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-700">
                            Corporate Headquarters
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
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
              {(contact.phone || site.phone) && (
                <a
                  href={`tel:${(contact.phone || site.phone).replace(/\D/g, '')}`}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Phone size={24} strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500">Sales — Cell</div>
                    <div className="font-semibold text-slate-900">{contact.phone || site.phone}</div>
                  </div>
                </a>
              )}
              <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <MapPin size={24} strokeWidth={1.75} />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-500">Coverage</div>
                  <div className="font-semibold text-slate-900">Nationwide — All 50 States</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-slate-900 p-8 text-white">
              <h2 className="text-xl font-semibold">Get Started Today</h2>
              <p className="mt-4 text-slate-300">
                Whether you need IT staffing, logistics solutions, cybersecurity, or BPO services,
                our team is ready to help you achieve your business goals.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/get-quote"
                  className="inline-flex justify-center rounded-md bg-brand-500 px-6 py-3 text-sm font-semibold transition hover:bg-brand-400"
                >
                  Get a Quote
                </Link>
                <Link
                  to="/enquiry"
                  className="inline-flex justify-center rounded-md border border-slate-600 px-6 py-3 text-sm font-semibold transition hover:bg-slate-800"
                >
                  Submit an Enquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}