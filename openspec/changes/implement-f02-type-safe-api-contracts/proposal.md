## Why

F02-US02 needs the API contract to become a reusable frontend boundary instead of scattered stubs and future comments. The API already exports generated registry/data types, so the next step is to turn `packages/tuyau` into the shared typed client used by ERP, CRM and PDV with consistent environment configuration.

## What Changes

- Replace the placeholder `@supexon/tuyau` package with a shared Tuyau client entrypoint that imports the generated API registry/data contracts.
- Configure API base URL resolution by environment for frontend consumers.
- Add app-level integration points for ERP, CRM and PDV to consume the shared client instead of local stub clients.
- Add a guard against direct `fetch` or isolated API clients in frontend app source once the shared client is available.
- Document the frontend API consumption pattern for Supexon apps.
- Update F02-US02 checkboxes in `docs/rfc-mvp.md` only when implementation evidence exists.

## Capabilities

### New Capabilities

- `type-safe-api-contracts`: Defines the shared Tuyau client contract, frontend base URL configuration, consumer integration pattern, and guardrails against bypassing the typed API boundary.

### Modified Capabilities

- None.

## Impact

- Affected package: `packages/tuyau`.
- Affected apps: `apps/erp`, `apps/crm`, `apps/pdv`.
- Affected docs: `docs/rfc-mvp.md` and a frontend API consumption guide.
- Affected tooling may include package scripts, workspace dependencies, and lint/check scripts used to prevent direct `fetch` or app-local API clients.
- This change should not implement domain CRUD, new backend routes, business logic, or replace mock-backed screens with real domain data beyond wiring the shared typed client boundary.
