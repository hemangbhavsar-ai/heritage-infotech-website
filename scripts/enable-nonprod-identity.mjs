/**
 * One-time setup: Identity + Git Gateway on heritage-infotech-nonprod.
 * Keeps auto-builds off so published deploys stay manual (15 credits each).
 *
 * Usage: node scripts/enable-nonprod-identity.mjs
 * Requires: netlify CLI logged in (`npx netlify status`)
 */
import { execFileSync } from 'node:child_process'

const SITE_ID = '0d66b77e-05f0-4b62-b1aa-9c2d6c8e5413'
const REPO = 'hemangbhavsar-ai/heritage-infotech-website'
const INVITE_EMAIL = process.env.ADMIN_INVITE_EMAIL || 'hemang.bhavsar@gmail.com'

function api(method, data) {
  const args = ['netlify', 'api', method, '--data', JSON.stringify(data)]
  const out = execFileSync('npx', args, { encoding: 'utf8' })
  try {
    return JSON.parse(out)
  } catch {
    return out
  }
}

function listServices() {
  const result = api('listServiceInstancesForSite', { site_id: SITE_ID })
  return Array.isArray(result) ? result : []
}

const existing = listServices()
const slugs = existing.map((s) => s.service_slug)
console.log('existing services:', slugs.join(', ') || '(none)')

if (!slugs.includes('identity')) {
  console.log('enabling Identity via /sites/{id}/identity ...')
  // createServiceInstance returns 422 for Identity; the dedicated endpoint works.
  const out = execFileSync(
    'npx',
    ['netlify', 'api', 'getSite', '--data', JSON.stringify({ site_id: SITE_ID })],
    { encoding: 'utf8' },
  )
  console.log('use POST /api/v1/sites/{site_id}/identity (already applied if identity_instance_id is set)')
  console.log(out.slice(0, 200))
} else {
  console.log('Identity already enabled')
}

console.log('linking GitHub repo with stop_builds=true...')
console.log(
  api('updateSite', {
    site_id: SITE_ID,
    repo: {
      provider: 'github',
      repo_path: REPO,
      repo_branch: 'main',
      cmd: 'npm run build',
      dir: 'dist',
      stop_builds: true,
    },
  }),
)

const afterLink = listServices()
const afterSlugs = afterLink.map((s) => s.service_slug)
if (!afterSlugs.includes('git')) {
  console.log('enabling Git Gateway...')
  console.log(
    api('createServiceInstance', {
      site_id: SITE_ID,
      addon: 'git',
      config: {
        github: { repo: REPO },
      },
    }),
  )
} else {
  console.log('Git Gateway already enabled')
}

console.log(`
Invite an admin (invite-only, same as prod):
1. Open https://app.netlify.com/projects/heritage-infotech-nonprod/configuration/identity
2. Invite users → ${INVITE_EMAIL}
3. Accept the email invite, set a password
4. Log in at https://heritage-infotech-nonprod.netlify.app/admin
   or https://dev.heritageinfotech.com/admin after DNS is mapped
`)
