import { PageHero } from '../components/PageHero'
import { Icon } from '../components/Icon'
import { pages } from '../lib/content'

export function VisionPage() {
  const { vision } = pages

  return (
    <>
      <PageHero title={vision.title} subtitle={vision.subtitle} />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-10">
            {vision.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-2xl font-semibold text-slate-900">{section.heading}</h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {vision.values.map((value) => (
              <div key={value.title} className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon name={value.icon} size={28} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}