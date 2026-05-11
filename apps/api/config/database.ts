import env from '#start/env'
import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'pg',

  connections: {
    pg: {
      client: 'pg',

      connection: env.get('DATABASE_URL'),

      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },

      schemaGeneration: {
        enabled: true,
        rulesPaths: [],
      },

      debug: app.inDev,
    },
  },
})

export default dbConfig
