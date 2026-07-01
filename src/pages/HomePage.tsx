import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { HeroCarousel } from '../components/HeroCarousel'
import { ServiceCard } from '../components/ServiceCard'
import { home } from '../lib/content'

export function HomePage() {
  return (
    <>
      <HeroCarousel slides={home.heroSlides} />

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">What We Deliver</h2>
              <p className="mt-4 text-lg text-slate-600">
                Heritage InfoTech brings together technology expertise, staffing excellence, and
                process innovation to help your organization achieve measurable results.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {home.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-brand-500" size={20} />
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Our Services</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Comprehensive solutions tailored to your enterprise needs
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {home.services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-600 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">{home.cta.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-100">{home.cta.subtitle}</p>
          <Link
            to={home.cta.buttonLink}
            className="mt-8 inline-flex rounded-md bg-white px-8 py-3.5 text-sm font-semibold text-brand-700 shadow-lg transition hover:bg-brand-50"
          >
            {home.cta.buttonText}
          </Link>
        </div>
      </section>
    </>
  )
}