import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { Icon } from '../components/Icon'
import {
  capabilityMeta,
  getClientCases,
  industryPath,
  isCapabilitySlug,
  isIndustrySlug,
} from '../lib/client-capabilities'
import { industries } from '../lib/content'

export function ClientCapabilityPage() {
  const { industry: industrySlug, capability: capabilitySlug } = useParams<{
    industry: string
    capability: string
  }>()

  if (!industrySlug || !isIndustrySlug(industrySlug)) {
    return <Navigate to="/about/clients" replace />
  }

  if (!capabilitySlug || !isCapabilitySlug(capabilitySlug)) {
    return <Navigate to={industryPath(industrySlug)} replace />
  }

  const industry = industries[industrySlug]
  const capability = capabilityMeta[capabilitySlug]
  const cases = getClientCases(industrySlug, capabilitySlug)

  return (
    <>
      <PageHero
        title={`${capability.title} — ${industry.title}`}
        subtitle={capability.intro}
      />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to={industryPath(industrySlug)}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-brand-600 transition hover:text-brand-500"
          >
            <ArrowLeft size={16} />
            Back to {industry.title}
          </Link>

          <div className="mb-12 flex items-start gap-5 rounded-xl border border-brand-100 bg-brand-50 p-6 sm:p-8">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white">
              <Icon name={capability.icon} size={32} />
            </div>
            <div className="space-y-4">
              {capability.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-lg leading-relaxed text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <h2 className="mb-8 text-2xl font-bold text-slate-900">Client Engagements</h2>
          <div className="space-y-10">
            {cases.map(({ client, project }) => (
              <article
                key={client.name}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="grid gap-0 lg:grid-cols-[280px_1fr]">
                  <div className="flex flex-col items-center justify-center gap-4 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-brand-50 p-8 lg:border-b-0 lg:border-r">
                    <div className="flex h-24 w-40 items-center justify-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                      <img
                        src={client.icon}
                        alt={`${client.name} logo`}
                        className="max-h-16 max-w-full object-contain"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-slate-900">{client.name}</h3>
                      <div className="mt-2 flex items-center justify-center gap-2 text-brand-600">
                        <Icon name={project.icon} size={18} />
                        <span className="text-sm font-semibold">{project.area}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 p-8">
                    <p className="font-medium text-slate-800">{project.summary ?? project.description}</p>
                    {(project.paragraphs ?? [project.description]).map((paragraph) => (
                      <p key={paragraph.slice(0, 40)} className="leading-relaxed text-slate-600">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}