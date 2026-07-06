import { pages } from './content'

export type NavChild = { label: string; path: string } | { divider: true; label: string }

export function buildClientsNavChildren(): NavChild[] {
  return [
    { label: 'All Clients', path: '/about/clients' },
    { divider: true, label: 'By Industry' },
    ...pages.clients.industries.map((industry) => ({
      label: industry.name,
      path: industry.path,
    })),
  ]
}