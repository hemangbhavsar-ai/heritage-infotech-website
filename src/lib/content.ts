import siteData from '../../content/site.json'
import homeData from '../../content/home.json'
import pagesData from '../../content/pages.json'
import timelineData from '../../content/timeline.json'
import leadershipData from '../../content/leadership.json'
import industriesData from '../../content/industries.json'
import type {
  HomeContent,
  IndustriesContent,
  LeadershipContent,
  PagesContent,
  SiteConfig,
  TimelineContent,
} from '../types/content'

export const site: SiteConfig = siteData as SiteConfig
export const home: HomeContent = homeData as HomeContent
export const pages: PagesContent = pagesData as PagesContent
export const timeline: TimelineContent = timelineData as TimelineContent
export const leadership: LeadershipContent = leadershipData as LeadershipContent
export const industries: IndustriesContent = industriesData as IndustriesContent