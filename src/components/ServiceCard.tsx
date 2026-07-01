import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Icon } from './Icon'
import type { ServiceCard as ServiceCardType } from '../types/content'

interface ServiceCardProps {
  service: ServiceCardType
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-300 hover:shadow-md">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
        <Icon name={service.icon} size={24} />
      </div>
      <h3 className="mb-3 text-lg font-semibold text-slate-900">{service.title}</h3>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">{service.excerpt}</p>
      <Link
        to={service.link}
        className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition hover:text-brand-500"
      >
        Learn More
        <ArrowRight size={16} className="transition group-hover:translate-x-1" />
      </Link>
    </article>
  )
}