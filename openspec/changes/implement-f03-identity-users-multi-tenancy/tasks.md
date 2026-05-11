## 1. Current State And Contracts

- [ ] 1.1 Inventory existing tenant-related models, transformers, migrations, auth routes, tests, and generated artifacts before editing source.
- [ ] 1.2 Define the tenant role constant/type set for `owner`, `admin`, `operator`, `seller`, and `viewer`.
- [ ] 1.3 Define the active tenant request contract, including the request header or endpoint shape used by typed clients.
- [ ] 1.4 Add or update TypeScript context types needed for resolved tenant and membership data on `HttpContext`.

## 2. Validators And Authorization Helpers

- [ ] 2.1 Create tenant validators for tenant creation and active tenant selection.
- [ ] 2.2 Create membership validators for creating/updating tenant members and validating supported roles.
- [ ] 2.3 Add centralized role authorization helpers for owner/admin/member checks.
- [ ] 2.4 Add tests for validator failure cases and unsupported roles where local test style supports unit-level validation.

## 3. Tenant API

- [ ] 3.1 Create tenant controller actions for tenant creation, accessible tenant listing, and active tenant validation/selection.
- [ ] 3.2 Ensure tenant creation wraps tenant and owner membership creation in a transaction.
- [ ] 3.3 Register authenticated `/api/v1` tenant routes using existing route naming and controller patterns.
- [ ] 3.4 Add functional tests for tenant creation, invalid tenant payloads, accessible tenant listing, and inaccessible/inactive tenant selection.

## 4. Membership API

- [ ] 4.1 Create membership controller actions for listing, creating, updating, and removing tenant members inside the active tenant.
- [ ] 4.2 Enforce owner/admin role rules for membership management and block non-admin roles.
- [ ] 4.3 Prevent invalid owner/member edge cases selected for MVP, such as unsupported owner deletion or unsafe owner demotion.
- [ ] 4.4 Register tenant-scoped membership routes under `/api/v1`.
- [ ] 4.5 Add functional tests for owner, admin, and non-admin membership-management behavior.

## 5. Active Tenant Middleware

- [ ] 5.1 Create named middleware that runs after auth, parses active tenant id, verifies membership, and exposes tenant context.
- [ ] 5.2 Set PostgreSQL `app.tenant_id` before downstream tenant-scoped handlers execute.
- [ ] 5.3 Reset PostgreSQL tenant context in a `finally` block after downstream handlers complete or throw.
- [ ] 5.4 Apply tenant middleware only to tenant-scoped routes and leave non-tenant account/auth routes unaffected.
- [ ] 5.5 Add functional tests for missing, invalid, inaccessible, and valid active tenant context.

## 6. RLS Policies

- [ ] 6.1 Inventory existing tables with `tenant_id` and decide which are tenant-owned for F03 RLS coverage.
- [ ] 6.2 Add source migration(s) enabling RLS and policies based on `current_setting('app.tenant_id', true)` for tenant-owned tables.
- [ ] 6.3 Keep identity/membership lookup tables accessible only through application authorization paths required by tenant selection.
- [ ] 6.4 Add tests proving cross-tenant reads/writes are blocked for representative tenant-owned tables.
- [ ] 6.5 Regenerate schema artifacts through the normal Adonis workflow if migrations change generated output.

## 7. RFC And Generated Artifacts

- [ ] 7.1 Avoid manual edits to generated files such as `.adonisjs/**` and `apps/api/database/schema.ts`; fix source files and regenerate when needed.
- [ ] 7.2 Update only F03-US01, F03-US02, and F03-US03 checkboxes in `docs/rfc-mvp.md` that have implementation and validation evidence.
- [ ] 7.3 Review generated API contract changes caused by new routes before finishing.

## 8. Verification

- [ ] 8.1 Run `pnpm --filter @supexon/api typecheck` and confirm it passes.
- [ ] 8.2 Run `pnpm --filter @supexon/api build` and confirm it passes.
- [ ] 8.3 Run `pnpm --filter @supexon/api test` and confirm it passes.
- [ ] 8.4 Run `openspec status --change implement-f03-identity-users-multi-tenancy` and confirm the change is apply-ready.
- [ ] 8.5 Review `git status --short --branch` and separate unrelated local changes from this F03 proposal.
