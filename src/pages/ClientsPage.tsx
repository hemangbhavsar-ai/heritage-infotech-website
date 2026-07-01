import { Building2 } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { pages } from '../lib/content'

export function ClientsPage() {
  const { clients } = pages

  return (
    <>
      <PageHero title={clients.title} subtitle={clients.subtitle} />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600">{clients.body}</p>

          <div className="mt-16">
            <h2 className="mb-8 text-center text-2xl font-semibold text-slate-900">Industries We Serve</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {clients.industries.map((industry) => (
                <div
                  key={industry}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Building2 size={24} strokeWidth={1.75} />
                  </div>
                  <span className="font-medium text-slate-800">{industry}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}