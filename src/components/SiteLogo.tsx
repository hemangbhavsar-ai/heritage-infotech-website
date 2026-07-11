import { Link } from 'react-router-dom'
import { Logo } from './Logo'

interface SiteLogoProps {
  className?: string
  onClick?: () => void
}

export function SiteLogo({ className = '', onClick }: SiteLogoProps) {
  return (
    <Link to="/" className={`site-logo ${className}`.trim()} onClick={onClick}>
      <Logo variant="light" />
    </Link>
  )
}