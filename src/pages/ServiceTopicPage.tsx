import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { Icon } from '../components/Icon'
import { HndlSection } from '../components/HndlSection'
import {
  getServiceOverview,
  getServiceTopic,
  getServiceTopics,
  serviceOverviewPath,
  serviceTopicPath,
  type ServiceArea,
} from '../lib/service-topics'

interface ServiceTopicPageProps {
  area: ServiceArea
}

export function ServiceTopicPage({ area }: ServiceTopicPageProps) {
  const { slug } = useParams<{ slug: string }>()

  if (!slug) {
    return <Navigate to={serviceOverviewPath(area)} replace />
  }

  const topic = getServiceTopic(area, slug)
  const overview = getServiceOverview(area)
  const related = getServiceTopics(area).filter((item) => item.slug !== slug)

  if (!topic) {
    return <Navigate to={serviceOverviewPath(area)} replace />
  }

  return <ServiceTopicView area={area} topic={topic} overviewTitle={overview.title} related={related} />
}

function ServiceTopicView({
  area,
  topic,
  overviewTitle,
  related,
}: {
  area: ServiceArea
  topic: NonNullable<ReturnType<typeof getServiceTopic>>
  overviewTitle: string
  related: ReturnType<typeof getServiceTopics>
}) {
  useEffect(() => {
    if (!topic.metaTitle && !topic.metaDescription) return
    const meta = document.querySelector('meta[name="description"]')
    const previousTitle = document.title
    const previousDescription = meta?.getAttribute('content') ?? ''
    if (topic.metaTitle) document.title = topic.metaTitle
    if (topic.metaDescription && meta) meta.setAttribute('content', topic.metaDescription)
    return () => {
      document.title = previousTitle
      if (meta) meta.setAttribute('content', previousDescription)
    }
  }, [topic.metaTitle, topic.metaDescription])

  return (
    <>
      <PageHero title={topic.title} subtitle={overviewTitle} />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            to={serviceOverviewPath(area)}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-brand-600 transition hover:text-brand-500"
          >
            <ArrowLeft size={16} />
            Back to {overviewTitle}
          </Link>

          <div className="mb-8 flex items-start gap-5 rounded-xl border border-brand-100 bg-brand-50 p-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white">
              <Icon name={topic.icon} size={28} />
            </div>
            <p className="text-lg leading-relaxed text-slate-700">{topic.summary}</p>
          </div>

          {topic.hndl && (
            <div className="mb-10">
              <HndlSection section={topic.hndl} />
            </div>
          )}

          <div className="space-y-6">
            {topic.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-lg leading-relaxed text-slate-600">
                {paragraph}
              </p>
            ))}
            {topic.blocks?.map((block) => (
              <div key={block.heading} className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">{block.heading}</h2>
                {block.paragraphs?.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-lg leading-relaxed text-slate-600">
                    {paragraph}
                  </p>
                ))}
                {block.bullets && (
                  <ul className="list-disc space-y-2 pl-5 text-lg leading-relaxed text-slate-600">
                    {block.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {block.table && (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-200">
                          {block.table.headers.map((header) => (
                            <th key={header} scope="col" className="py-2 pr-4 font-semibold text-slate-900">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.table.rows.map((row) => (
                          <tr key={row.join('|')} className="border-b border-slate-100">
                            {row.map((cell) => (
                              <td key={cell} className="py-3 pr-4 align-top text-slate-600">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
            {topic.sampleEngagement && (
              <p className="text-lg leading-relaxed text-slate-700">{topic.sampleEngagement}</p>
            )}
            {topic.closingNote && (
              <p className="text-sm leading-relaxed text-slate-600">
                {topic.closingNote}{' '}
                {topic.closingNoteLink && (
                  <Link
                    to={topic.closingNoteLink}
                    className="font-semibold text-brand-600 transition hover:text-brand-500"
                  >
                    {topic.closingNoteLinkLabel ?? 'Contact us'}
                  </Link>
                )}
              </p>
            )}
          </div>

          {related.length > 0 && (
            <div className="mt-14 border-t border-slate-200 pt-10">
              <h2 className="text-xl font-semibold text-slate-900">Related Capabilities</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={serviceTopicPath(area, item.slug)}
                      className="block rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-600"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  )
}