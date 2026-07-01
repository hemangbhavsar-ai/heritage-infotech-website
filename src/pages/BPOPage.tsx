import { PageHero } from '../components/PageHero'
import { Icon } from '../components/Icon'
import { pages } from '../lib/content'

export function BPOPage() {
  const { bpo } = pages

  return (
    <>
      <PageHero title={bpo.title} subtitle={bpo.subtitle} />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mx-auto mb-16 max-w-3xl text-lg leading-relaxed text-slate-600">{bpo.body}</p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {bpo.benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon name={benefit.icon} size={28} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{benefit.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}