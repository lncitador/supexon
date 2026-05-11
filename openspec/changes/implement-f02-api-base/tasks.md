## 1. Dependency And Environment

- [ ] 1.1 Search `apps/api` and root workspace files for SQLite or `better-sqlite3` references and confirm no active API runtime/test path still needs SQLite.
- [ ] 1.2 Remove `better-sqlite3` from `apps/api/package.json` and update `pnpm-lock.yaml`.
- [ ] 1.3 Ensure `apps/api/.env.example` documents the PostgreSQL `DATABASE_URL` contract used by `config/database.ts`.
- [ ] 1.4 Expand `apps/api/.env.test` with all required boot variables using local non-production values and a PostgreSQL `DATABASE_URL`.
- [ ] 1.5 Simplify the API `test` script to rely on repo-local test env defaults instead of inline environment variables, if verified by the test runner.

## 2. Minimal API Tests

- [ ] 2.1 Add functional coverage for `GET /` returning the API identity and healthy status.
- [ ] 2.2 Add functional coverage for `GET /health` returning healthy status.
- [ ] 2.3 Add functional coverage for invalid signup payloads returning validation errors without successful account creation.
- [ ] 2.4 Add functional coverage for invalid login payloads returning validation errors without successful authentication.
- [ ] 2.5 Add functional coverage for unauthenticated `GET /api/v1/account/profile` returning unauthorized.
- [ ] 2.6 Keep the minimal suite database-light and avoid valid signup/login success flows in this change.

## 3. RFC And Generated Artifacts

- [ ] 3.1 Avoid manual edits to generated files such as `.adonisjs/**` and `apps/api/database/schema.ts`; fix source files if generated output changes.
- [ ] 3.2 Update only the F02-US01 checkboxes in `docs/rfc-mvp.md` whose implementation and validation evidence exists in this change.

## 4. Verification

- [ ] 4.1 Run `pnpm --filter @supexon/api typecheck` and confirm it passes.
- [ ] 4.2 Run `pnpm --filter @supexon/api build` and confirm it passes.
- [ ] 4.3 Run `pnpm --filter @supexon/api test` and confirm it passes.
- [ ] 4.4 Run `openspec status --change implement-f02-api-base` and confirm the change is apply-ready.
- [ ] 4.5 Review `git status --short --branch` and generated-file changes before finishing.
