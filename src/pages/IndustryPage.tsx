import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { Icon } from '../components/Icon'
import {
  CAPABILITY_SLUGS,
  capabilityMeta,
  capabilityPath,
  areaToCapabilitySlug,
  isCapabilitySlug,
} from '../lib/client-capabilities'
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
          <div className="mx-auto mb-10 flex max-w-3xl items-start gap-4 rounded-xl border border-brand-100 bg-brand-50 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-white">
              <Icon name={industry.icon} size={24} />
            </div>
            <p className="text-lg leading-relaxed text-slate-700">{industry.intro}</p>
          </div>

          <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITY_SLUGS.map((capSlug) => {
              const cap = capabilityMeta[capSlug]
              return (
                <Link
                  key={capSlug}
                  to={capabilityPath(slug, capSlug)}
                  className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-300 hover:shadow-md"
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
                    <Icon name={cap.icon} size={22} />
                  </div>
                  <h3 className="font-semibold text-slate-900">{cap.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{cap.intro}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-600">
                    View engagements <ArrowRight size={12} />
                  </span>
                </Link>
              )
            })}
          </div>

          <div className="space-y-16">
            {industry.clients.map((client) => (
              <article
                key={client.name}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="flex flex-col gap-6 border-b border-slate-100 bg-slate-50 p-6 sm:flex-row sm:items-center sm:p-8">
                  <div className="flex h-20 w-36 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                    <img
                      src={client.icon}
                      alt={`${client.name} logo`}
                      className="max-h-14 max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{client.name}</h2>
                    <p className="mt-2 text-slate-600">{client.summary}</p>
                  </div>
                </div>

                <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
                  {client.projects.map((project) => {
                    const rawSlug = project.slug ?? areaToCapabilitySlug(project.area)
                    const capSlug = rawSlug && isCapabilitySlug(rawSlug) ? rawSlug : undefined
                    const cardContent = (
                      <>
                        <div className="mb-3 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
                            <Icon name={project.icon} size={20} />
                          </div>
                          <h3 className="font-semibold text-slate-900">{project.area}</h3>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-600">{project.description}</p>
                        {capSlug && (
                          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-600">
                            View full engagement <ArrowRight size={12} />
                          </span>
                        )}
                      </>
                    )

                    return capSlug ? (
                      <Link
                        key={project.area}
                        to={capabilityPath(slug, capSlug)}
                        className="group block rounded-xl border border-slate-100 bg-slate-50/50 p-5 transition hover:border-brand-200 hover:shadow-sm"
                      >
                        {cardContent}
                      </Link>
                    ) : (
                      <div
                        key={project.area}
                        className="rounded-xl border border-slate-100 bg-slate-50/50 p-5"
                      >
                        {cardContent}
                      </div>
                    )
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}