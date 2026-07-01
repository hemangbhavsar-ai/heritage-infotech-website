import { PageHero } from '../components/PageHero'
import { Icon } from '../components/Icon'
import { industries } from '../lib/content'
import type { IndustrySlug } from '../types/content'

interface IndustryPageProps {
  slug: IndustrySlug
}

export function IndustryPage({ slug }: IndustryPageProps) {
  const industry = industries[slug]

  return (
    <>
      <PageHero title={industry.title} subtitle={industry.subtitle} />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 flex max-w-3xl items-start gap-4 rounded-xl border border-brand-100 bg-brand-50 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-white">
              <Icon name={industry.icon} size={24} />
            </div>
            <p className="text-lg leading-relaxed text-slate-700">{industry.intro}</p>
          </div>

          <div className="space-y-16">
            {industry.clients.map((client) => (
              <article
                key={client.name}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="flex flex-col gap-6 border-b border-slate-100 bg-slate-50 p-6 sm:flex-row sm:items-center sm:p-8">
                  <img
                    src={client.icon}
                    alt={`${client.name} logo`}
                    className="h-16 w-16 shrink-0 rounded-xl shadow-sm"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{client.name}</h2>
                    <p className="mt-2 text-slate-600">{client.summary}</p>
                  </div>
                </div>

                <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
                  {client.projects.map((project) => (
                    <div
                      key={project.area}
                      className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 transition hover:border-brand-200"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                          <Icon name={project.icon} size={20} />
                        </div>
                        <h3 className="font-semibold text-slate-900">{project.area}</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-600">{project.description}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}