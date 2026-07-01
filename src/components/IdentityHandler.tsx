import { useEffect } from 'react'

declare global {
  interface Window {
    netlifyIdentity?: {
      on: (event: string, callback: (user?: unknown) => void) => void
      open: (mode?: string) => void
      init: () => void
    }
  }
}

function hasAuthTokenInHash() {
  const hash = window.location.hash
  return (
    hash.includes('recovery_token') ||
    hash.includes('invite_token') ||
    hash.includes('confirmation_token') ||
    hash.includes('confirm_token')
  )
}

export function IdentityHandler() {
  useEffect(() => {
    if (document.getElementById('netlify-identity-widget')) return

    const script = document.createElement('script')
    script.id = 'netlify-identity-widget'
    script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js'
    script.async = true
    script.onload = () => {
      const identity = window.netlifyIdentity
      if (!identity) return

      identity.on('init', (user) => {
        const onAdmin = window.location.pathname.startsWith('/admin')

        if (hasAuthTokenInHash()) {
          const hash = window.location.hash
          const mode = hash.includes('recovery_token')
            ? 'recovery'
            : hash.includes('invite_token')
              ? 'signup'
              : 'login'
          identity.open(mode)
        }

        if (!user) {
          identity.on('login', () => {
            if (onAdmin) {
              window.location.href = '/admin/'
            }
          })
        }
      })

      identity.init()
    }
    document.body.appendChild(script)
  }, [])

  return null
}