import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { HeroSlide } from '../types/content'

interface HeroCarouselProps {
  slides: HeroSlide[]
}

const AUTO_MS = 7000

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = slides.length

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return
      setCurrent(((index % count) + count) % count)
    },
    [count],
  )

  useEffect(() => {
    if (count < 2 || paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % count)
    }, AUTO_MS)
    return () => window.clearInterval(timer)
  }, [count, paused])

  if (count === 0) return null

  const slide = slides[current] ?? slides[0]

  return (
    <section
      className="relative min-h-[480px] overflow-hidden bg-slate-900 sm:min-h-[560px]"
      aria-roledescription="carousel"
      aria-label="Featured services"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false)
        }
      }}
    >
      {slides.map((item, index) => (
        <div
          key={item.ctaLink + item.title}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            index === current ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          aria-hidden={index !== current}
        >
          {item.image ? (
            <img
              src={item.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          ) : (
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, #0092c1 0%, transparent 50%),
                                 radial-gradient(circle at 80% 20%, #007a9e 0%, transparent 40%)`,
              }}
            />
          )}
          <div
            className={`absolute inset-0 ${
              item.image
                ? 'bg-gradient-to-r from-slate-950/92 via-slate-950/78 to-slate-900/45'
                : 'bg-gradient-to-r from-slate-900 via-slate-900/95 to-brand-900/40'
            }`}
          />
        </div>
      ))}

      <div className="relative mx-auto flex min-h-[480px] max-w-7xl items-center px-4 sm:min-h-[560px] sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-400">
            Heritage InfoTech LLC
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {slide.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-300 sm:text-xl">{slide.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to={slide.ctaLink}
              className="inline-flex items-center rounded-md bg-brand-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-400"
            >
              {slide.cta}
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-md border border-slate-600 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-brand-400 hover:text-brand-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(current - 1)}
          className="rounded-full bg-slate-800/80 p-2 text-white transition hover:bg-brand-500"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2" role="tablist" aria-label="Choose a featured service">
          {slides.map((item, i) => (
            <button
              key={item.ctaLink + item.title}
              type="button"
              role="tab"
              aria-selected={i === current}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? 'w-8 bg-brand-500' : 'w-2 bg-slate-600 hover:bg-slate-500'
              }`}
              aria-label={`Go to slide ${i + 1}: ${item.title}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(current + 1)}
          className="rounded-full bg-slate-800/80 p-2 text-white transition hover:bg-brand-500"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}
