import {
  BarChart3,
  Briefcase,
  Cog,
  Handshake,
  Lightbulb,
  PieChart,
  Route,
  ShieldCheck,
  Smartphone,
  Target,
  TrendingDown,
  TrendingUp,
  Truck,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  workflow: Workflow,
  users: Users,
  truck: Truck,
  briefcase: Briefcase,
  lightbulb: Lightbulb,
  handshake: Handshake,
  target: Target,
  route: Route,
  'shield-check': ShieldCheck,
  'bar-chart': BarChart3,
  smartphone: Smartphone,
  'trending-down': TrendingDown,
  'trending-up': TrendingUp,
  cog: Cog,
  'pie-chart': PieChart,
}

interface IconProps {
  name: string
  className?: string
  size?: number
}

export function Icon({ name, className = '', size = 24 }: IconProps) {
  const LucideComponent = iconMap[name] ?? Workflow
  return <LucideComponent className={className} size={size} strokeWidth={1.75} />
}