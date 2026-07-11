import { site } from '../lib/content'

type LogoVariant = 'dark' | 'light' | 'mark'

interface LogoProps {
  variant?: LogoVariant
  className?: string
}

export const LOGO_HEADER_PATH = '/images/logo/newlogo-heritageinfotech-header.jpg'
export const LOGO_HEADER_WIDTH = 283
export const LOGO_HEADER_HEIGHT = 94

const logoSources: Record<LogoVariant, string> = {
  dark: LOGO_HEADER_PATH,
  light: LOGO_HEADER_PATH,
  mark: LOGO_HEADER_PATH,
}

export function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const src = site.logo?.[variant] || logoSources[variant]

  return (
    <img
      src={src}
      alt="Heritage InfoTech"
      width={LOGO_HEADER_WIDTH}
      height={LOGO_HEADER_HEIGHT}
      decoding="async"
      className={className}
    />
  )
}