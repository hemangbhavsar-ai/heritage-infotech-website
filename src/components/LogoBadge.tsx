import { SiteLogo } from './SiteLogo'

interface LogoBadgeProps {
  className?: string
}

/** @deprecated Use SiteLogo — kept for footer import compatibility */
export function LogoBadge({ className = '' }: LogoBadgeProps) {
  return <SiteLogo className={className} />
}