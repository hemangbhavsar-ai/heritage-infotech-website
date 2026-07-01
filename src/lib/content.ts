import siteData from '../../content/site.json'
import homeData from '../../content/home.json'
import pagesData from '../../content/pages.json'
import type { HomeContent, PagesContent, SiteConfig } from '../types/content'

export const site: SiteConfig = siteData as SiteConfig
export const home: HomeContent = homeData as HomeContent
export const pages: PagesContent = pagesData as PagesContent