import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { Icon } from '../components/Icon'
import { pages } from '../lib/content'

export function ClientsPage() {
  const { clients } = pages

  return (
    <>
      <PageHero title={clients.title} subtitle={clients.subtitle} />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-slate-600">{clients.body}</p>

          <div className="mt-16">
            <h2 className="mb-8 text-center text-2xl font-semibold text-slate-900">Industries We Serve</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {clients.industries.map((industry) => (
                <Link
                  key={industry.path}
                  to={industry.path}
                  className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-300 hover:shadow-md"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
                    <Icon name={industry.icon} size={28} />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-slate-900">{industry.name}</span>
                    <span className="mt-1 flex items-center gap-1 text-sm text-brand-600 opacity-0 transition group-hover:opacity-100">
                      View clients <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}