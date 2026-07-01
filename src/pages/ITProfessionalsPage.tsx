import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { Icon } from '../components/Icon'
import { pages } from '../lib/content'
import { serviceTopicPath } from '../lib/service-topics'

export function ITProfessionalsPage() {
  const { itProfessionals } = pages

  return (
    <>
      <PageHero title={itProfessionals.title} subtitle={itProfessionals.subtitle} />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mx-auto mb-16 max-w-3xl text-lg leading-relaxed text-slate-600">{itProfessionals.body}</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {itProfessionals.topics.map((topic) => (
              <Link
                key={topic.slug}
                to={serviceTopicPath('it-professionals', topic.slug)}
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-300 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
                  <Icon name={topic.icon} size={24} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{topic.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{topic.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}