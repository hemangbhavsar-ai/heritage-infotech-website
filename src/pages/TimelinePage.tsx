import { PageHero } from '../components/PageHero'
import { timeline } from '../lib/content'

export function TimelinePage() {
  return (
    <>
      <PageHero title={timeline.title} subtitle={timeline.subtitle} />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="mb-16 text-center text-lg leading-relaxed text-slate-600">{timeline.intro}</p>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-brand-200 sm:left-1/2 sm:-ml-px" />

            {timeline.milestones.map((milestone, index) => (
              <div
                key={milestone.year + milestone.title}
                className={`relative mb-12 flex flex-col sm:mb-16 ${
                  index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                <div className="hidden w-1/2 sm:block" />
                <div
                  className={`absolute left-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-brand-500 shadow-md sm:left-1/2 ${
                    index % 2 === 0 ? '' : ''
                  }`}
                >
                  <span className="sr-only">{milestone.year}</span>
                </div>
                <div
                  className={`ml-12 w-full sm:ml-0 sm:w-1/2 ${
                    index % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'
                  }`}
                >
                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-300 hover:shadow-md">
                    <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-sm font-bold text-brand-700">
                      {milestone.year}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900">{milestone.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}