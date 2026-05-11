/**
 * STUB API CLIENT
 *
 * This module will be replaced with a real Tuyau client once codegen is ready.
 * When @tuyau/core and @supexon/api/registry are available, replace this with:
 *
 *   import { createTuyau } from '@tuyau/core/client'
 *   import { registry } from '@supexon/api/registry'
 *
 *   export const api = createTuyau({
 *     baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3333',
 *     registry,
 *   })
 *
 * Until then, all data is sourced from src/mocks/.
 */

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error'

export interface ApiResponse<T> {
  data: T | null
  status: ApiStatus
  error: string | null
}

export function createApiClient(_baseUrl?: string) {
  return {
    baseUrl: _baseUrl ?? (import.meta.env['VITE_API_URL'] as string | undefined) ?? 'http://localhost:3333',
    get: async <T>(resource: string): Promise<ApiResponse<T>> => {
      console.warn(`[api stub] GET ${resource} — using mock data`)
      return { data: null, status: 'idle', error: null }
    },
    post: async <T>(resource: string, _body: unknown): Promise<ApiResponse<T>> => {
      console.warn(`[api stub] POST ${resource} — not implemented`)
      return { data: null, status: 'idle', error: null }
    },
  }
}

export const apiClient = createApiClient()
