import { industries } from './content'
import type { ClientProject, IndustryClient, IndustrySlug } from '../types/content'

export const CAPABILITY_SLUGS = [
  'ai-machine-learning',
  'enterprise-integrations',
  'data-engineering',
  'security-compliance',
] as const

export type CapabilitySlug = (typeof CAPABILITY_SLUGS)[number]

export const capabilityMeta: Record<
  CapabilitySlug,
  { title: string; icon: string; intro: string; paragraphs: string[] }
> = {
  'ai-machine-learning': {
    title: 'AI & Machine Learning',
    icon: 'brain',
    intro: 'Intelligent automation and predictive analytics that transform how enterprises operate.',
    paragraphs: [
      'Heritage InfoTech deploys production-grade machine learning solutions — from model development and MLOps pipelines to responsible AI governance — tailored to each industry\'s regulatory and operational requirements. Our teams embed alongside your data science and engineering organizations to deliver models that move beyond proof-of-concept into measurable business outcomes.',
      'Across healthcare, financial services, manufacturing, and public sector engagements, we combine domain expertise with modern ML frameworks to solve high-value problems including fraud detection, predictive maintenance, clinical analytics, and intelligent document processing.',
    ],
  },
  'enterprise-integrations': {
    title: 'Enterprise Integrations',
    icon: 'workflow',
    intro: 'Connected enterprise architectures that unify legacy systems, cloud platforms, and partner ecosystems.',
    paragraphs: [
      'Heritage InfoTech architects and implements integration solutions using API gateways, enterprise service buses, event-driven patterns, and iPaaS platforms that enable real-time data flow across your technology landscape. We specialize in complex multi-vendor environments where reliability, observability, and version governance are critical.',
      'From HL7 FHIR interoperability in healthcare to core banking consolidation in financial services and ERP harmonization in manufacturing, our integration practice reduces manual handoffs, accelerates time-to-market for new capabilities, and establishes the connectivity layer your digital transformation depends on.',
    ],
  },
  'data-engineering': {
    title: 'Data Engineering',
    icon: 'database',
    intro: 'Governed data platforms, pipelines, and analytics foundations built for scale and trust.',
    paragraphs: [
      'Heritage InfoTech builds enterprise data engineering capabilities — data lakes, warehouses, mesh architectures, and real-time streaming pipelines — with lineage, quality controls, and metadata management embedded from the start. We help organizations consolidate fragmented data assets into platforms that serve analytics, AI, and operational reporting from a single governed source of truth.',
      'Our data engineers bring experience across cloud-native stacks on Azure, AWS, and GCP, as well as industry-specific requirements such as HIPAA PHI handling, financial regulatory reporting, and OT/IT telemetry fusion for industrial clients.',
    ],
  },
  'security-compliance': {
    title: 'Security & Compliance',
    icon: 'shield-check',
    intro: 'Enterprise security programs that protect sensitive data and satisfy regulatory obligations.',
    paragraphs: [
      'Heritage InfoTech delivers security and compliance engagements spanning identity governance, zero-trust architecture, cryptographic modernization, continuous monitoring, and audit-ready controls alignment. We work with CISO organizations, risk committees, and infrastructure teams to close gaps without disrupting business-critical operations.',
      'Our security practice addresses industry-specific frameworks including HIPAA, SOX, NAIC, FedRAMP-aligned controls, HITRUST, and emerging quantum-readiness requirements — ensuring your security investments are proportionate to actual risk and regulatory exposure.',
    ],
  },
}

const areaToSlug: Record<string, CapabilitySlug> = {
  'AI & Machine Learning': 'ai-machine-learning',
  'Enterprise Integrations': 'enterprise-integrations',
  'Data Engineering': 'data-engineering',
  'Security & Compliance': 'security-compliance',
}

export function areaToCapabilitySlug(area: string): CapabilitySlug | undefined {
  return areaToSlug[area]
}

export function capabilityPath(industry: IndustrySlug, capability: CapabilitySlug) {
  return `/about/clients/${industry}/${capability}`
}

export function industryPath(industry: IndustrySlug) {
  return `/about/clients/${industry}`
}

export interface ClientCapabilityCase {
  client: IndustryClient
  project: ClientProject
}

export function getClientCases(
  industry: IndustrySlug,
  capability: CapabilitySlug,
): ClientCapabilityCase[] {
  const page = industries[industry]
  const cases: ClientCapabilityCase[] = []

  for (const client of page.clients) {
    const project = client.projects.find(
      (p) => (p.slug ?? areaToSlug[p.area]) === capability,
    )
    if (project) {
      cases.push({ client, project })
    }
  }

  return cases
}

export function isCapabilitySlug(value: string): value is CapabilitySlug {
  return CAPABILITY_SLUGS.includes(value as CapabilitySlug)
}

export function isIndustrySlug(value: string): value is IndustrySlug {
  return value in industries
}