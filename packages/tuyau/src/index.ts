export type ApiClientStatus = 'not-configured'

export interface ApiClientPlaceholder {
  status: ApiClientStatus
  packageName: '@supexon/tuyau'
}

export const apiClient: ApiClientPlaceholder = {
  status: 'not-configured',
  packageName: '@supexon/tuyau',
}
