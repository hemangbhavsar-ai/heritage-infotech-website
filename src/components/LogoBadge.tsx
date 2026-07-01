import { Logo } from './Logo'

interface LogoBadgeProps {
  className?: string
}

export function LogoBadge({ className = '' }: LogoBadgeProps) {
  return (
    <div
      className={`inline-flex items-center rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-white/20 ${className}`}
    >
      <Logo
        variant="light"
        showTagline
        className="block h-10 w-[248px] max-w-none sm:h-[42px] sm:w-[260px]"
      />
    </div>
  )
}