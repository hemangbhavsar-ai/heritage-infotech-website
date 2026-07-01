import { CheckCircle2 } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { pages } from '../lib/content'

export function StaffingPage() {
  const { staffing } = pages

  return (
    <>
      <PageHero title={staffing.title} subtitle={staffing.subtitle} />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-lg leading-relaxed text-slate-600">{staffing.body}</p>
            <ul className="mt-10 space-y-4">
              {staffing.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-lg bg-slate-50 p-4">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-brand-500" size={20} />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}