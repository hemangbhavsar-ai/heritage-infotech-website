import {
  getServiceTopics,
  serviceOverviewPath,
  serviceTopicPath,
  type ServiceArea,
} from './service-topics'

export type NavChild = { label: string; path: string; indent?: boolean } | { divider: true; label: string }

const serviceSections: Array<{ area: ServiceArea; label: string }> = [
  { area: 'it-professionals', label: 'IT Professional Services & Consulting' },
  { area: 'cybersecurity', label: 'Cybersecurity & Quantum Readiness' },
  { area: 'logistics', label: 'Logistic Solutions Suite' },
  { area: 'staffing', label: 'Staffing Solutions' },
]

export function buildServicesNavChildren(): NavChild[] {
  const items: NavChild[] = []

  for (const section of serviceSections) {
    items.push({ divider: true, label: section.label })
    items.push({ label: 'Overview', path: serviceOverviewPath(section.area) })
    for (const topic of getServiceTopics(section.area)) {
      items.push({
        label: topic.title,
        path: serviceTopicPath(section.area, topic.slug),
        indent: true,
      })
    }
  }

  items.push({ divider: true, label: 'More Services' })
  items.push({ label: 'Business Process Outsourcing', path: '/services/bpo' })

  return items
}