export const SUPEXON_APP_NAMES = ['api', 'erp', 'crm', 'pdv', 'portal'] as const

export type SupexonAppName = (typeof SUPEXON_APP_NAMES)[number]

export const SUPEXON_DOMAINS = ['identity', 'catalog', 'inventory', 'production', 'purchasing', 'crm', 'sales'] as const

export type SupexonDomain = (typeof SUPEXON_DOMAINS)[number]
