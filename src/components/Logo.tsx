import { site } from '../lib/content'

type LogoVariant = 'dark' | 'light' | 'mark'

interface LogoProps {
  variant?: LogoVariant
  className?: string
  showTagline?: boolean
}

const logoSources: Record<LogoVariant, string> = {
  dark: '/images/logo/heritage-infotech-header.svg',
  light: '/images/logo/heritage-infotech-light.svg',
  mark: '/images/logo/heritage-infotech-header.svg',
}

export function Logo({ variant = 'dark', className = '', showTagline = false }: LogoProps) {
  const src = site.logo?.[variant] || logoSources[variant]

  return (
    <img
      src={src}
      alt={`${site.companyName}${showTagline ? ` — ${site.tagline}` : ''}`}
      className={className}
      loading="eager"
      decoding="async"
      style={{ imageRendering: 'auto' }}
    />
  )
}