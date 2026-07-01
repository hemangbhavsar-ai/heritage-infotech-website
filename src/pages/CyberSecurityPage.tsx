import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { Icon } from '../components/Icon'
import { pages } from '../lib/content'
import { serviceTopicPath } from '../lib/service-topics'

export function CyberSecurityPage() {
  const { cyberSecurity } = pages

  return (
    <>
      <PageHero title={cyberSecurity.title} subtitle={cyberSecurity.subtitle} />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mx-auto mb-6 max-w-3xl text-lg leading-relaxed text-slate-600">{cyberSecurity.body}</p>
          <p className="mx-auto mb-16 max-w-3xl text-center text-slate-600">{cyberSecurity.intro}</p>

          <div className="mb-16 grid gap-8 sm:grid-cols-2">
            {cyberSecurity.topics.map((topic) => (
              <Link
                key={topic.slug}
                to={serviceTopicPath('cybersecurity', topic.slug)}
                className="group rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-brand-300 hover:shadow-md"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
                  <Icon name={topic.icon} size={28} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{topic.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{topic.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>

          <div className="rounded-2xl bg-slate-900 p-8 text-white sm:p-12">
            <h2 className="text-2xl font-bold">Additional Capabilities</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {cyberSecurity.capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-brand-400" size={20} />
                  <span className="text-slate-300">{cap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}