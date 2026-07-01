interface PageHeroProps {
  title: string
  subtitle?: string
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-16 text-white sm:py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-600/30 via-transparent to-slate-900" />
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-slate-300">{subtitle}</p>}
      </div>
    </section>
  )
}