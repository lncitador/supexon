import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5000,
    host: true,
    allowedHosts: true,
    proxy: {
      '/erp': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
      },
      '/crm': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        ws: true,
      },
      '/pdv': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
