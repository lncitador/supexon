## Why

F02-US01 has the API scaffold mostly present, but the remaining checklist items still leave the API base ambiguous: SQLite runtime is still installed, test execution depends on ad hoc defaults, and the API lacks a minimal automated proof for its public technical/auth endpoints. Completing this now gives the rest of the MVP a PostgreSQL-only API base with repeatable typecheck, build, and test commands.

## What Changes

- Remove the SQLite runtime dependency from `apps/api` when it is no longer used by configuration, tests, or runtime code.
- Standardize `apps/api/.env.example` around the PostgreSQL `DATABASE_URL` contract used by `config/database.ts`.
- Make API scripts reliable for local validation, especially `typecheck`, `build`, and `test`.
- Add a minimal API test suite covering technical endpoints and the base auth/profile flow shape without introducing domain CRUD.
- Update `docs/rfc-mvp.md` F02-US01 checkboxes only when repository evidence exists in the implementation.

## Capabilities

### New Capabilities

- `api-base`: Defines the baseline API runtime contract for PostgreSQL configuration, dependency surface, validation commands, and minimal automated API tests.

### Modified Capabilities

- None.

## Impact

- Affected app: `apps/api`.
- Affected files may include `apps/api/package.json`, `apps/api/.env.example`, `apps/api/tests/**`, and `docs/rfc-mvp.md`.
- Dependency impact: remove `better-sqlite3` from the API if no longer required.
- No domain controllers, domain routes, RLS, frontend integration, or business logic should be introduced by this change.
