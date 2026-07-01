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

export interface IndustryLink {
  name: string
  path: string
  icon: string
}

export interface Milestone {
  year: string
  title: string
  description: string
}

export interface TimelineContent {
  title: string
  subtitle: string
  intro: string
  milestones: Milestone[]
}

export interface Leader {
  name: string
  title: string
  image: string
  bio: string
}

export interface LeadershipContent {
  title: string
  subtitle: string
  intro: string
  members: Leader[]
}

export interface ClientProject {
  area: string
  icon: string
  description: string
}

export interface IndustryClient {
  name: string
  icon: string
  summary: string
  projects: ClientProject[]
}

export interface IndustryPage {
  title: string
  subtitle: string
  intro: string
  icon: string
  clients: IndustryClient[]
}

export interface IndustriesContent {
  healthcare: IndustryPage
  financial: IndustryPage
  technology: IndustryPage
  logistics: IndustryPage
  government: IndustryPage
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
    industries: IndustryLink[]
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
  cyberSecurity: {
    title: string
    subtitle: string
    body: string
    intro: string
    services: FeatureItem[]
    capabilities: string[]
  }
}

export type IndustrySlug = keyof IndustriesContent