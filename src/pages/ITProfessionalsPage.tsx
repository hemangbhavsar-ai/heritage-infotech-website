import { CheckCircle2 } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { pages } from '../lib/content'

export function ITProfessionalsPage() {
  const { itProfessionals } = pages

  return (
    <>
      <PageHero title={itProfessionals.title} subtitle={itProfessionals.subtitle} />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-lg leading-relaxed text-slate-600">{itProfessionals.body}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-8">
              <h2 className="mb-6 text-xl font-semibold text-slate-900">Core Capabilities</h2>
              <ul className="space-y-4">
                {itProfessionals.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-brand-500" size={20} />
                    <span className="text-slate-700">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}