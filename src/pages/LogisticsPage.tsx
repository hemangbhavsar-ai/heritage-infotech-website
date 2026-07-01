import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { Icon } from '../components/Icon'
import { pages } from '../lib/content'
import { serviceTopicPath } from '../lib/service-topics'

export function LogisticsPage() {
  const { logistics } = pages

  return (
    <>
      <PageHero title={logistics.title} subtitle={logistics.subtitle} />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mx-auto mb-16 max-w-3xl text-lg leading-relaxed text-slate-600">{logistics.body}</p>
          <div className="grid gap-8 sm:grid-cols-2">
            {logistics.topics.map((topic) => (
              <Link
                key={topic.slug}
                to={serviceTopicPath('logistics', topic.slug)}
                className="group flex gap-5 rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-brand-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
                  <Icon name={topic.icon} size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{topic.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{topic.summary}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                    Learn more <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}