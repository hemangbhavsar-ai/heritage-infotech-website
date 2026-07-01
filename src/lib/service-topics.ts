import { pages } from './content'
import type { ServiceTopic } from '../types/content'

export type ServiceArea = 'it-professionals' | 'cybersecurity' | 'logistics' | 'staffing'

const serviceRoots: Record<ServiceArea, string> = {
  'it-professionals': '/services/it-professionals',
  cybersecurity: '/services/cybersecurity',
  logistics: '/services/logistics',
  staffing: '/services/staffing',
}

export function getServiceTopics(area: ServiceArea): ServiceTopic[] {
  switch (area) {
    case 'it-professionals':
      return pages.itProfessionals.topics
    case 'cybersecurity':
      return pages.cyberSecurity.topics
    case 'logistics':
      return pages.logistics.topics
    case 'staffing':
      return pages.staffing.topics
  }
}

export function getServiceTopic(area: ServiceArea, slug: string): ServiceTopic | undefined {
  return getServiceTopics(area).find((topic) => topic.slug === slug)
}

export function getServiceOverview(area: ServiceArea) {
  switch (area) {
    case 'it-professionals':
      return pages.itProfessionals
    case 'cybersecurity':
      return pages.cyberSecurity
    case 'logistics':
      return pages.logistics
    case 'staffing':
      return pages.staffing
  }
}

export function serviceTopicPath(area: ServiceArea, slug: string) {
  return `${serviceRoots[area]}/${slug}`
}

export function serviceOverviewPath(area: ServiceArea) {
  return serviceRoots[area]
}