## Context

F02-US01 in `docs/rfc-mvp.md` targets the API base. The API already has AdonisJS 7, JSON routes, auth endpoints, PostgreSQL configuration via `DATABASE_URL`, and generated contracts. The remaining gaps are mostly hardening and proof: remove unused SQLite runtime, make environment examples/test defaults coherent, and add a minimal API test suite so `typecheck`, `build`, and `test` are reliable signals before domain work expands.

The current API package still declares `better-sqlite3`, while `config/database.ts` only configures the `pg` connection. The existing `.env.example` already uses `DATABASE_URL`, but `.env.test` is incomplete and the test command currently depends on inline defaults. There are no API test files yet.

## Goals / Non-Goals

**Goals:**

- Remove SQLite runtime from the API dependency surface when no config or test path uses it.
- Keep PostgreSQL as the single documented database contract through `DATABASE_URL`.
- Make API test environment defaults explicit and repo-local.
- Add minimal API tests for technical endpoints and base auth boundary behavior.
- Prove `pnpm --filter @supexon/api typecheck`, `pnpm --filter @supexon/api build`, and `pnpm --filter @supexon/api test`.
- Update only the F02-US01 RFC checkboxes completed by this implementation.

**Non-Goals:**

- Do not implement domain CRUD, tenant management, RLS, or business services.
- Do not add frontend API integration or Tuyau client consumption.
- Do not create a complex database-backed test fixture layer.
- Do not change API route semantics beyond what is needed for baseline tests.
- Do not mark F02-US02 or F03+ checkboxes complete.

## Decisions

### Use PostgreSQL-only runtime dependencies

`better-sqlite3` should be removed from `apps/api` if no code path references SQLite. This keeps the package aligned with the documented PostgreSQL-only database config.

Alternative considered: leave SQLite installed for future tests. That conflicts with F02-US01's explicit "remove SQLite when no longer necessary" item and hides accidental fallback paths.

### Move test defaults into `.env.test`

The API test script should not carry a long list of inline environment variables. Instead, `apps/api/.env.test` should define all required boot variables with local, non-production defaults, including `DATABASE_URL`.

Alternative considered: keep inline script defaults. That works mechanically but duplicates configuration and makes the package script harder to maintain.

### Keep the minimum suite database-light

The minimum API suite should verify routes that can run without database setup: root metadata, health, auth validation boundaries, and protected profile behavior without credentials. This proves the HTTP stack, route registration, serialization path where applicable, and auth guard boundary without introducing data fixtures.

Alternative considered: include signup/login success tests now. That requires database setup, migrations, cleanup strategy, and likely user fixture conventions that belong to a later identity/multi-tenant test layer.

### Preserve generated files as generated

If test/build commands regenerate `.adonisjs` files, the implementation should report those changes, but fixes must happen in source files, routes, transformers, env, or tests.

Alternative considered: edit generated files directly to satisfy types. That violates the existing generated-artifact rule and will be overwritten by Adonis.

## Risks / Trade-offs

- Removing SQLite could reveal a hidden dependency → Mitigation: search the repo for SQLite/better-sqlite usage and run API build/typecheck/test.
- Database-light tests may feel too small → Mitigation: keep them scoped to F02-US01 and leave database-backed auth success tests for identity/tenant work.
- `.env.test` with a PostgreSQL URL may imply tests require a running database → Mitigation: ensure the minimal tests do not execute DB queries, while keeping the variable present for boot-time validation.
- Test commands may regenerate API contract artifacts → Mitigation: review git status after verification and avoid manual edits to generated output.

## Migration Plan

1. Search for SQLite references in API code and configuration.
2. Remove `better-sqlite3` from `apps/api/package.json` and update the lockfile.
3. Expand `apps/api/.env.test` so `node ace test` can boot without inline env defaults.
4. Simplify the API test script if `.env.test` supplies the required variables.
5. Add minimal functional tests for root, health, auth validation, and unauthorized profile access.
6. Run API typecheck, build, and test.
7. Update F02-US01 checkboxes in `docs/rfc-mvp.md` for completed evidence only.

Rollback is a normal commit revert. No production database or data migration is involved.

## Open Questions

- Should the minimal suite use only functional HTTP tests, or should it also include a small unit test for route metadata?
- Should `DATABASE_URL` in `.env.test` point to a clearly fake local PostgreSQL database or to the same example URL as `.env.example`?
