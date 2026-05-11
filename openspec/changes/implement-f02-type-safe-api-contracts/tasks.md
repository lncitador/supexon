## 1. Shared Tuyau Package

- [x] 1.1 Inspect `@tuyau/core` exports and current generated API registry/data exports before changing `packages/tuyau`.
- [x] 1.2 Update `packages/tuyau/package.json` dependencies, exports and scripts needed for the shared typed client.
- [x] 1.3 Replace the placeholder `packages/tuyau/src/index.ts` with typed client exports based on `@supexon/api/registry` and `@supexon/api/data`.
- [x] 1.4 Add a base URL helper that accepts an explicit override, reads Vite `VITE_API_URL`, and falls back to the documented local API URL.

## 2. Frontend App Integration

- [x] 2.1 Add `@supexon/tuyau` as a workspace dependency of `apps/erp`.
- [x] 2.2 Add `@supexon/tuyau` as a workspace dependency of `apps/crm`.
- [x] 2.3 Add `@supexon/tuyau` as a workspace dependency of `apps/pdv`.
- [x] 2.4 Replace ERP `src/lib/api.ts` stub behavior with a thin shared-client re-export.
- [x] 2.5 Replace CRM `src/lib/api.ts` stub behavior with a thin shared-client re-export.
- [x] 2.6 Replace PDV `src/lib/api.ts` stub behavior with a thin shared-client re-export.
- [x] 2.7 Add frontend `.env.example` files documenting `VITE_API_URL` where missing.

## 3. Guardrails And Documentation

- [x] 3.1 Add an automated guard that detects direct `fetch(` or standalone app-local API client implementations in frontend app source outside approved boundaries.
- [x] 3.2 Wire the guard into an appropriate package or root script so it can be run during validation.
- [x] 3.3 Document the frontend API consumption pattern, including imports, base URL config, generated contract ownership and no-direct-client rule.
- [x] 3.4 Update only F02-US02 checkboxes in `docs/rfc-mvp.md` whose implementation and validation evidence exists in this change.

## 4. Verification

- [x] 4.1 Run `pnpm --filter @supexon/api build` or the required codegen-producing command if generated contracts need refresh.
- [x] 4.2 Run `pnpm --filter @supexon/tuyau typecheck`.
- [x] 4.3 Run `pnpm --filter @supexon/tuyau build`.
- [x] 4.4 Run typecheck/build for each touched frontend app: ERP, CRM and PDV.
- [x] 4.5 Run the direct API bypass guard and confirm it passes.
- [x] 4.6 Run `openspec instructions apply --change implement-f02-type-safe-api-contracts --json` and confirm all tasks are complete.
- [x] 4.7 Review `git status --short --branch` and generated-file changes before finishing.
