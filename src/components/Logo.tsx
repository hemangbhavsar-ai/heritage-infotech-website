import { site } from '../lib/content'

type LogoVariant = 'dark' | 'light' | 'mark'

interface LogoProps {
  variant?: LogoVariant
  className?: string
  showTagline?: boolean
}

const logoSources: Record<LogoVariant, string> = {
  dark: '/images/logo/heritage-infotech-original.gif',
  light: '/images/logo/heritage-infotech-original.gif',
  mark: '/images/logo/heritage-infotech-original.gif',
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
    />
  )
}