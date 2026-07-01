import { PageHero } from '../components/PageHero'
import { Icon } from '../components/Icon'
import { pages } from '../lib/content'

export function LogisticsPage() {
  const { logistics } = pages

  return (
    <>
      <PageHero title={logistics.title} subtitle={logistics.subtitle} />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mx-auto mb-16 max-w-3xl text-lg leading-relaxed text-slate-600">{logistics.body}</p>
          <div className="grid gap-8 sm:grid-cols-2">
            {logistics.features.map((feature) => (
              <div key={feature.title} className="flex gap-5 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon name={feature.icon} size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}