export interface SiteConfig {
  companyName: string
  tagline: string
  email: string
  phone: string
  copyright: string
  social: {
    linkedin: string
    twitter: string
    facebook: string
    youtube: string
  }
}

export interface HeroSlide {
  title: string
  subtitle: string
  cta: string
  ctaLink: string
}

export interface ServiceCard {
  id: string
  title: string
  excerpt: string
  link: string
  icon: string
}

export interface HomeContent {
  heroSlides: HeroSlide[]
  highlights: string[]
  services: ServiceCard[]
  cta: {
    title: string
    subtitle: string
    buttonText: string
    buttonLink: string
  }
}

export interface PageSection {
  heading: string
  body: string
}

export interface ValueItem {
  title: string
  description: string
  icon: string
}

export interface FeatureItem {
  title: string
  description: string
  icon: string
}

export interface PagesContent {
  vision: {
    title: string
    subtitle: string
    sections: PageSection[]
    values: ValueItem[]
  }
  clients: {
    title: string
    subtitle: string
    body: string
    industries: string[]
  }
  itProfessionals: {
    title: string
    subtitle: string
    body: string
    capabilities: string[]
  }
  logistics: {
    title: string
    subtitle: string
    body: string
    features: FeatureItem[]
  }
  staffing: {
    title: string
    subtitle: string
    body: string
    highlights: string[]
  }
  bpo: {
    title: string
    subtitle: string
    body: string
    benefits: FeatureItem[]
  }
  contact: {
    title: string
    subtitle: string
    body: string
    email: string
  }
}