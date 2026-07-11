import { PageHero } from '../components/PageHero'
import { leadership } from '../lib/content'

export function LeadershipPage() {
  return (
    <>
      <PageHero title={leadership.title} subtitle={leadership.subtitle} />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mx-auto mb-16 max-w-3xl text-center text-lg leading-relaxed text-slate-600">
            {leadership.intro}
          </p>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.members.map((member) => (
              <article
                key={member.name}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-brand-300 hover:shadow-md"
              >
                <div className="h-52 w-full overflow-hidden rounded-t-xl bg-slate-200 sm:h-56">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: member.imagePosition || 'center 30%' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-brand-600">{member.title}</p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-xs font-medium text-slate-500 transition hover:text-brand-600 hover:underline"
                    >
                      View LinkedIn profile
                    </a>
                  )}
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}