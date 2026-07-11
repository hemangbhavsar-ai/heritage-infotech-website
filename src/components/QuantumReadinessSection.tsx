import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { Icon } from './Icon'
import type { QuantumReadinessSection as QuantumSection } from '../types/content'

interface QuantumReadinessSectionProps {
  section: QuantumSection
}

export function QuantumReadinessSection({ section }: QuantumReadinessSectionProps) {
  return (
    <section className="bg-slate-900 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{section.title}</h2>
          <p className="mt-3 text-lg text-brand-200">{section.subtitle}</p>
          <p className="mt-6 text-base leading-relaxed text-slate-300">{section.intro}</p>
          <Link
            to={section.learnMoreLink}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
          >
            Explore Cybersecurity Services
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {section.tiles.map((tile) => (
            <Link
              key={tile.slug}
              to={tile.link}
              className="group overflow-hidden rounded-xl border border-slate-700 bg-slate-800/60 transition hover:border-brand-400 hover:shadow-lg hover:shadow-brand-900/30"
            >
              <div className="relative h-44 overflow-hidden sm:h-48">
                <img
                  src={tile.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-500/90 text-white">
                  <Icon name={tile.icon} size={22} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white">{tile.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{tile.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-300">
                  Learn more <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-white">Industry Standards & Frameworks</h3>
            <ul className="mt-4 space-y-3">
              {section.standards.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-white">Authoritative Resources</h3>
            <ul className="mt-4 space-y-3">
              {section.resources.map((resource) => (
                <li key={resource.url}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 text-sm text-brand-300 transition hover:text-brand-200"
                  >
                    <ExternalLink size={14} className="mt-0.5 shrink-0" />
                    <span>{resource.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}