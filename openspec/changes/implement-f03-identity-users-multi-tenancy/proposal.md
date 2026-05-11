## Why

F03 has the tenant and membership tables/models in place, but the product still lacks the API boundary that lets authenticated users create tenants, list accessible tenants, choose an active tenant, and enforce tenant isolation. Completing this establishes the identity and multi-tenancy layer required before catalog, inventory, CRM, PDV, and production endpoints can safely expose tenant-owned data.

## What Changes

- Add tenant validators, controllers, and `/api/v1` routes for tenant creation, accessible tenant listing, and active tenant selection.
- Add membership validators, controllers, and routes for managing users inside a tenant.
- Define and enforce the initial roles: `owner`, `admin`, `operator`, `seller`, and `viewer`.
- Persist the active tenant for each authenticated request through an API contract and middleware/context layer.
- Define the PostgreSQL `app.tenant_id` strategy, set it per request, reset it after request handling, and add RLS policies for tenant-owned tables.
- Add tests proving tenant membership authorization and cross-tenant isolation.
- Update `docs/rfc-mvp.md` F03 checkboxes only when implementation and validation evidence exists.

## Capabilities

### New Capabilities

- `identity-tenancy`: Covers tenant management, tenant membership, role authorization, active tenant request context, and PostgreSQL RLS isolation.

### Modified Capabilities

- None.

## Impact

- Affected app: `apps/api`.
- Affected API surface: `/api/v1/tenants`, active tenant selection/context, and tenant membership routes.
- Affected database behavior: tenant-owned tables will gain RLS policies backed by the request tenant context.
- Affected files may include API validators, controllers, routes, middleware, services, migrations, policies, tests, generated contracts, and `docs/rfc-mvp.md`.
- No ERP/CRM/PDV/Portal UI integration, catalog CRUD, inventory flows, or non-F03 domain endpoints should be introduced by this change.
