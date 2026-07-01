import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Phone, Users } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { Icon } from '../components/Icon'
import { pages } from '../lib/content'

export function GetQuotePage() {
  const { getQuote } = pages

  return (
    <>
      <PageHero title={getQuote.title} subtitle={getQuote.subtitle} />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mx-auto mb-6 max-w-3xl text-lg leading-relaxed text-slate-600">{getQuote.body}</p>
          <p className="mx-auto mb-16 max-w-3xl text-center text-slate-600">{getQuote.intro}</p>

          <div className="mb-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {getQuote.offerings.map((offering) => (
              <div
                key={offering.title}
                className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-brand-300 hover:shadow-md"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={offering.icon} size={28} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{offering.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{offering.description}</p>
              </div>
            ))}
          </div>

          <div className="mb-16 rounded-2xl bg-slate-900 p-8 text-white sm:p-12">
            <h2 className="text-2xl font-bold">{getQuote.processTitle}</h2>
            <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {getQuote.processSteps.map((step, index) => (
                <li key={step.title} className="relative">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-sm font-bold">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 sm:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                <Users size={32} strokeWidth={1.75} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{getQuote.ctaTitle}</h2>
              <p className="mt-4 text-slate-600">{getQuote.ctaBody}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={`mailto:${getQuote.salesEmail}`}
                  className="inline-flex items-center gap-2 rounded-md bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
                >
                  <Mail size={18} />
                  {getQuote.salesEmail}
                </a>
                <a
                  href={`tel:${getQuote.salesPhone.replace(/\D/g, '')}`}
                  className="inline-flex items-center gap-2 rounded-md border border-brand-300 bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
                >
                  <Phone size={18} />
                  {getQuote.salesPhone}
                </a>
              </div>
              <p className="mt-6 text-sm text-slate-500">{getQuote.ctaNote}</p>
              <Link
                to="/enquiry"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition hover:text-brand-500"
              >
                Prefer a written enquiry? Submit our form
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}