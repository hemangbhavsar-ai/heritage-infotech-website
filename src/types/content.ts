export interface SiteLogo {
  dark: string
  light: string
  mark: string
  letterhead: string
}

export interface SiteConfig {
  companyName: string
  tagline: string
  logo?: SiteLogo
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
  manufacturing: IndustryPage
}

export interface ContactLocation {
  name: string
  region: string
  address: string
  mapEmbed: string
  isHeadquarters?: boolean
}

export interface QuoteOffering {
  title: string
  description: string
  icon: string
}

export interface QuoteProcessStep {
  title: string
  description: string
}

export interface ServiceTopic {
  slug: string
  title: string
  icon: string
  summary: string
  paragraphs: string[]
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
    topics: ServiceTopic[]
  }
  logistics: {
    title: string
    subtitle: string
    body: string
    topics: ServiceTopic[]
  }
  staffing: {
    title: string
    subtitle: string
    body: string
    topics: ServiceTopic[]
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
    phone?: string
    locations?: ContactLocation[]
  }
  getQuote: {
    title: string
    subtitle: string
    body: string
    intro: string
    offerings: QuoteOffering[]
    processTitle: string
    processSteps: QuoteProcessStep[]
    ctaTitle: string
    ctaBody: string
    ctaNote: string
    salesEmail: string
    salesPhone: string
  }
  cyberSecurity: {
    title: string
    subtitle: string
    body: string
    intro: string
    topics: ServiceTopic[]
    capabilities: string[]
  }
}

export type IndustrySlug = keyof IndustriesContent