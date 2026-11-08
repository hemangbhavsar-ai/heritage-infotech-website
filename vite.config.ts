import type { Connect, ViteDevServer } from 'vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function splitPath(url = '/') {
  const q = url.indexOf('?')
  return q === -1 ? { path: url, qs: '' } : { path: url.slice(0, q), qs: url.slice(q) }
}

function adminRouting(): Connect.NextHandleFunction {
  return (req, res, next) => {
    const { path, qs } = splitPath(req.url)

    // Decap resolves config.yml relative to the page URL. /admin (no slash)
    // would fetch /config.yml, which Vite would serve as the React SPA.
    if (path === '/admin') {
      res.statusCode = 302
      res.setHeader('Location', `/admin/${qs}`)
      res.end()
      return
    }

    if (path === '/config.yml') {
      req.url = `/admin/config.yml${qs}`
      next()
      return
    }

    if (path === '/admin/') {
      req.url = `/admin/index.html${qs}`
    }
    next()
  }
}

function serveDecapAdmin() {
  return {
    name: 'serve-decap-admin',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(adminRouting())
    },
    configurePreviewServer(server: ViteDevServer) {
      server.middlewares.use(adminRouting())
    },
  }
}

export default defineConfig({
  plugins: [serveDecapAdmin(), react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      // Reduces Safari tab crashes when the dev server restarts mid-session.
      overlay: false,
    },
  },
})