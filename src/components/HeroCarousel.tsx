import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { HeroSlide } from '../types/content'

interface HeroCarouselProps {
  slides: HeroSlide[]
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  const slide = slides[current]

  return (
    <section className="relative min-h-[480px] overflow-hidden bg-slate-900 sm:min-h-[560px]">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-brand-900/40" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #0092c1 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, #007a9e 0%, transparent 40%)`,
        }}
      />

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
          onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
          className="rounded-full bg-slate-800/80 p-2 text-white transition hover:bg-brand-500"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? 'w-8 bg-brand-500' : 'w-2 bg-slate-600 hover:bg-slate-500'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
          className="rounded-full bg-slate-800/80 p-2 text-white transition hover:bg-brand-500"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}