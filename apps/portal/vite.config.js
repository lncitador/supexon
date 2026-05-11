import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

const __dirname = new URL('.', import.meta.url).pathname

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({
      projects: [
        resolve(__dirname, 'tsconfig.json'),
        resolve(__dirname, '../erp/tsconfig.json'),
        resolve(__dirname, '../crm/tsconfig.json'),
        resolve(__dirname, '../pdv/tsconfig.json'),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@supexon/erp': resolve(__dirname, '../erp/src/ERPApp.tsx'),
      '@supexon/crm': resolve(__dirname, '../crm/src/CRMApp.tsx'),
      '@supexon/pdv': resolve(__dirname, '../pdv/src/PDVApp.tsx'),
    },
  },
  server: {
    port: 5000,
    host: true,
    allowedHosts: true,
  },
})
