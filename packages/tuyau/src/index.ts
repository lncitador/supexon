import { createTuyau } from '@tuyau/core/client'
import { registry } from '@supexon/api/registry'

export type { Data } from '@supexon/api/data'
export type { registry as ApiRegistry } from '@supexon/api/registry'

export const DEFAULT_API_BASE_URL = 'http://localhost:3333'
export const API_BASE_URL_ENV_KEY = 'VITE_API_URL'

type BrowserImportMeta = ImportMeta & {
  env?: Record<string, string | boolean | undefined>
}

export interface ResolveApiBaseUrlOptions {
  baseUrl?: string
  env?: Record<string, string | boolean | undefined>
}

export function resolveApiBaseUrl(options: ResolveApiBaseUrlOptions = {}) {
  if (options.baseUrl) {
    return options.baseUrl
  }

  const env = options.env ?? (import.meta as BrowserImportMeta).env
  const envBaseUrl = env?.[API_BASE_URL_ENV_KEY]

  if (typeof envBaseUrl === 'string' && envBaseUrl.length > 0) {
    return envBaseUrl
  }

  return DEFAULT_API_BASE_URL
}

export interface CreateSupexonApiClientOptions extends ResolveApiBaseUrlOptions {}

export function createSupexonApiClient(options: CreateSupexonApiClientOptions = {}) {
  return createTuyau({
    registry,
    baseUrl: resolveApiBaseUrl(options),
  })
}

export const api = createSupexonApiClient()
export const apiClient = api

export type SupexonApiClient = ReturnType<typeof createSupexonApiClient>
