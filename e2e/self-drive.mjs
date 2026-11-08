import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const BASE = process.env.BASE_URL || 'http://localhost:5173'
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const leadership = JSON.parse(readFileSync(resolve(ROOT, 'content/leadership.json'), 'utf8'))
const pages = JSON.parse(readFileSync(resolve(ROOT, 'content/pages.json'), 'utf8'))
const home = JSON.parse(readFileSync(resolve(ROOT, 'content/home.json'), 'utf8'))

const PUBLIC_ROUTES = [
  { path: '/', expect: /Heritage InfoTech|Innovate/i },
  { path: '/about/vision', expect: /vision/i },
  { path: '/about/timeline', expect: /timeline|2013/i },
  { path: '/about/leadership', expect: /Leadership Team/i },
  { path: '/about/clients', expect: /client/i },
  { path: '/about/clients/healthcare', expect: /health/i },
  { path: '/about/clients/financial', expect: /financial/i },
  { path: '/about/clients/technology', expect: /technolog/i },
  { path: '/about/clients/logistics', expect: /logistic/i },
  { path: '/about/clients/government', expect: /government/i },
  { path: '/about/clients/manufacturing', expect: /manufactur/i },
  { path: '/services/it-professionals', expect: /IT|consult/i },
  { path: '/services/cybersecurity', expect: /cyber|quantum/i },
  { path: '/services/logistics', expect: /logistic/i },
  { path: '/services/staffing', expect: /staff/i },
  { path: '/services/bpo', expect: /BPO|outsourcing|process/i },
  { path: '/contact', expect: /contact/i },
  { path: '/enquiry', expect: /enquir/i },
  { path: '/get-quote', expect: /quote/i },
]

const SERVICE_AREAS = {
  'it-professionals': pages.itProfessionals?.topics ?? [],
  cybersecurity: pages.cyberSecurity?.topics ?? [],
  logistics: pages.logistics?.topics ?? [],
  staffing: pages.staffing?.topics ?? [],
}

for (const [area, topics] of Object.entries(SERVICE_AREAS)) {
  for (const topic of topics) {
    PUBLIC_ROUTES.push({
      path: `/services/${area}/${topic.slug}`,
      expect: new RegExp(topic.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
    })
  }
}

const results = []

function record(ok, name, detail = '') {
  results.push({ ok, name, detail })
  const mark = ok ? 'PASS' : 'FAIL'
  console.log(`${mark}  ${name}${detail ? ` — ${detail}` : ''}`)
}

async function dismissIdentity(page) {
  const close = page.locator(
    '#netlify-identity-widget .callToAction, .netlify-identity-close, button:has-text("Close"), [aria-label="Close"]',
  )
  if (await close.first().isVisible({ timeout: 1500 }).catch(() => false)) {
    await close.first().click({ force: true }).catch(() => {})
  }
  await page.evaluate(() => {
    const iframe = document.getElementById('netlify-identity-widget')
    if (iframe) iframe.remove()
    document.documentElement.classList.remove('netlify-identity-page')
    document.body.style.overflow = ''
  })
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  page.setDefaultTimeout(20000)

  try {
    for (const route of PUBLIC_ROUTES) {
      const response = await page.goto(`${BASE}${route.path}`, { waitUntil: 'domcontentloaded' })
      const status = response?.status() ?? 0
      if (status >= 400) {
        record(false, `GET ${route.path}`, `HTTP ${status}`)
        continue
      }
      const body = await page.locator('body').innerText()
      const hasText = route.expect.test(body)
      const hasError = /something went wrong|page not found|cannot get/i.test(body)
      record(hasText && !hasError, `GET ${route.path}`, hasText ? 'rendered' : 'missing expected content')
    }

    await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
    const dropdowns = page.locator('header nav button')
    const dropdownCount = await dropdowns.count()
    for (let i = 0; i < dropdownCount; i += 1) {
      await dropdowns.nth(i).hover()
      await page.waitForTimeout(200)
    }
    const navLinks = await page.evaluate(() => {
      const hrefs = [...document.querySelectorAll('header a[href], footer a[href]')]
        .map((el) => el.getAttribute('href') || '')
        .filter((href) => href.startsWith('/') && !href.startsWith('//'))
      return [...new Set(hrefs)]
    })
    record(navLinks.length >= 8, `Header/footer nav collected ${navLinks.length} internal links`)
    for (const href of navLinks) {
      const res = await page.request.get(`${BASE}${href}`)
      record(res.ok(), `Nav link ${href}`, `HTTP ${res.status()}`)
    }

    const homeOrder = await page.evaluate(() => {
      const needles = [
        'What We Deliver',
        'Our Services',
        'Quantum Readiness as a Service',
        'Explore Cybersecurity Services',
        'Get in Touch',
      ]
      return needles.map((text) => {
        const el = [...document.querySelectorAll('h2, a, p, button')].find((node) =>
          (node.textContent || '').includes(text),
        )
        if (!el) return { text, top: null }
        return { text, top: el.getBoundingClientRect().top + window.scrollY }
      })
    })
    const tops = homeOrder.map((item) => item.top)
    const allFound = tops.every((top) => typeof top === 'number')
    const inOrder = allFound && tops.every((top, i) => i === 0 || top > tops[i - 1])
    record(
      inOrder,
      'Home section order',
      homeOrder.map((item) => `${item.text}@${item.top == null ? 'missing' : Math.round(item.top)}`).join(' → '),
    )

    await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
    const heroSlides = Array.isArray(home.heroSlides) ? home.heroSlides : []
    record(heroSlides.length >= 6, `Hero has ${heroSlides.length} slides`, 'expect at least 6')
    const dots = page.locator('[aria-label^="Go to slide"]')
    record((await dots.count()) === heroSlides.length, 'Hero dots match slide count')

    for (const [index, slide] of heroSlides.entries()) {
      await dots.nth(index).click()
      await page.waitForTimeout(400)
      const heading = page.getByRole('heading', { level: 1, name: slide.title })
      record(await heading.isVisible().catch(() => false), `Hero slide: ${slide.title}`)

      const linkRes = await page.request.get(`${BASE}${slide.ctaLink}`)
      record(linkRes.ok(), `Hero CTA link: ${slide.ctaLink}`, `HTTP ${linkRes.status()}`)

      if (slide.image) {
        const imgRes = await page.request.get(`${BASE}${slide.image}`)
        record(imgRes.ok(), `Hero image: ${slide.title}`, `${slide.image} HTTP ${imgRes.status()}`)
      }
    }

    const phonePages = ['/contact', '/get-quote', '/']
    for (const path of phonePages) {
      await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded' })
      const text = await page.locator('body').innerText()
      const hasNew = /1\s*\(888\)\s*734-3240/.test(text)
      const hasOld = /440[\s-]*281[\s-]*2678/.test(text)
      record(hasNew && !hasOld, `Phone on ${path}`, hasNew ? '1 (888) 734-3240' : 'missing new number')
    }

    await page.goto(`${BASE}/about/leadership`, { waitUntil: 'networkidle' })
    for (const member of leadership.members) {
      const nameVisible = await page.getByRole('heading', { name: member.name, exact: true }).isVisible()
      record(nameVisible, `Leadership name: ${member.name}`)

      const img = page.locator(`img[alt="${member.name}"]`)
      const imgCount = await img.count()
      if (imgCount === 0) {
        record(false, `Leadership photo: ${member.name}`, 'img not in DOM')
        continue
      }
      const src = await img.first().getAttribute('src')
      const natural = await img.first().evaluate((el) => ({
        complete: el.complete,
        w: el.naturalWidth,
        h: el.naturalHeight,
      }))
      const head = await page.request.get(`${BASE}${src}`)
      const isSvg = (src || '').endsWith('.svg') && !/\.jpe?g($|\?)/i.test(src || '')
      record(
        head.ok() && natural.w > 0 && isSvg,
        `Leadership photo: ${member.name}`,
        `${src} HTTP ${head.status()} ${natural.w}x${natural.h}`,
      )
    }

    const noSlash = await page.goto(`${BASE}/admin`, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(2500)
    const noSlashBody = await page.locator('body').innerText()
    const configError = /Error loading the CMS configuration|must have required property/i.test(noSlashBody)
    record(
      Boolean(noSlash?.ok()) && !configError,
      'GET /admin (no trailing slash) loads CMS',
      configError ? noSlashBody.slice(0, 180) : `HTTP ${noSlash?.status()} → ${page.url()}`,
    )

    const yamlFromRoot = await page.request.get(`${BASE}/config.yml`)
    const yamlFromRootText = await yamlFromRoot.text()
    record(
      yamlFromRoot.ok() && yamlFromRootText.includes('backend:') && !yamlFromRootText.includes('<!doctype html>'),
      'GET /config.yml is YAML, not HTML',
      `HTTP ${yamlFromRoot.status()} ${yamlFromRoot.headers()['content-type'] || ''}`,
    )

    const yamlFromAdmin = await page.request.get(`${BASE}/admin/config.yml`)
    const yamlFromAdminText = await yamlFromAdmin.text()
    record(
      yamlFromAdmin.ok() && yamlFromAdminText.includes('local_backend: true'),
      'GET /admin/config.yml is Decap YAML',
      `HTTP ${yamlFromAdmin.status()}`,
    )

    const adminRes = await page.goto(`${BASE}/admin/`, { waitUntil: 'domcontentloaded' })
    const adminHtml = await page.content()
    const isDecap = /decap-cms|Content Manager/i.test(adminHtml)
    const adminBody = await page.locator('body').innerText()
    record(
      Boolean(adminRes?.ok()) && isDecap && !/Error loading the CMS configuration/i.test(adminBody),
      'Admin serves Decap CMS',
      `HTTP ${adminRes?.status()}`,
    )

    await page.waitForTimeout(2500)
    await dismissIdentity(page)

    const loginBtn = page.getByRole('button', { name: /log\s*in/i }).first()
    const alreadyIn = await page.getByText(/Leadership Team|Site Settings|About Us|Home Page/i).first()
      .isVisible()
      .catch(() => false)

    if (!alreadyIn) {
      const loginVisible = await loginBtn.isVisible().catch(() => false)
      record(loginVisible, 'Admin login button visible')
      if (loginVisible) {
        await loginBtn.click()
        await page.waitForTimeout(1500)
        await dismissIdentity(page)
      }
    } else {
      record(true, 'Admin already authenticated')
    }

    const collectionsVisible = await page
      .getByText(/Site Settings|Home Page|About Us|Leadership Team/i)
      .first()
      .isVisible({ timeout: 20000 })
      .catch(() => false)
    record(collectionsVisible, 'Admin collections visible after login')

    const homeCms = page.locator('a[href*="collections/home"]').first()
    if (await homeCms.isVisible().catch(() => false)) {
      await homeCms.click()
      await page.waitForTimeout(800)
    }
    const homeEntry = page.locator('a[href*="collections/home/entries"]').first()
    if (await homeEntry.isVisible().catch(() => false)) {
      await homeEntry.click()
    } else {
      await page.goto(`${BASE}/admin/#/collections/home/entries/homepage`, {
        waitUntil: 'domcontentloaded',
      })
    }
    await page.waitForTimeout(1500)
    const heroEditor = await page
      .getByText(/Hero Banner|carousel|Hero Slides/i)
      .first()
      .isVisible({ timeout: 15000 })
      .catch(() => false)
    record(heroEditor, 'CMS can edit hero banner slides')

    const yamlHasHero = yamlFromAdminText.includes('heroSlides') && yamlFromAdminText.includes('Hero Banner')
    record(yamlHasHero, 'CMS config exposes heroSlides')

    const aboutUs = page.locator('a[href*="collections/about"]').first()
    if (await aboutUs.isVisible().catch(() => false)) {
      await aboutUs.click()
      await page.waitForTimeout(1500)
    } else {
      await page.goto(`${BASE}/admin/#/collections/about`, { waitUntil: 'domcontentloaded' })
      await page.waitForTimeout(1500)
    }

    const leadershipEntry = page.locator('a[href*="entries/leadership"]').first()
    const leadershipFallback = page.getByRole('link', { name: /Leadership Team/i }).first()
    const target = (await leadershipEntry.isVisible().catch(() => false))
      ? leadershipEntry
      : leadershipFallback

    if (await target.isVisible().catch(() => false)) {
      await target.click()
    } else {
      await page.goto(`${BASE}/admin/#/collections/about/entries/leadership`, {
        waitUntil: 'domcontentloaded',
      })
    }
    await page.waitForTimeout(1500)
    const editorHasMembers = await page
      .getByText(/Shilpa Bhavsar|Team Members|Photo/i)
      .first()
      .isVisible({ timeout: 15000 })
      .catch(() => false)
    record(
      editorHasMembers,
      'Admin Leadership Team editor opened',
      editorHasMembers ? '' : `url=${page.url()}`,
    )
  } catch (err) {
    record(false, 'Runner crashed', err instanceof Error ? err.message : String(err))
  } finally {
    await browser.close()
  }

  const failed = results.filter((r) => !r.ok)
  console.log('\n--- self-drive summary ---')
  console.log(`passed ${results.length - failed.length} / ${results.length}`)
  if (failed.length) {
    console.log('failures:')
    for (const f of failed) console.log(`  - ${f.name}${f.detail ? ` (${f.detail})` : ''}`)
    process.exit(1)
  }
}

main()
