## 1. Shared Tuyau Package

- [ ] 1.1 Inspect `@tuyau/core` exports and current generated API registry/data exports before changing `packages/tuyau`.
- [ ] 1.2 Update `packages/tuyau/package.json` dependencies, exports and scripts needed for the shared typed client.
- [ ] 1.3 Replace the placeholder `packages/tuyau/src/index.ts` with typed client exports based on `@supexon/api/registry` and `@supexon/api/data`.
- [ ] 1.4 Add a base URL helper that accepts an explicit override, reads Vite `VITE_API_URL`, and falls back to the documented local API URL.

## 2. Frontend App Integration

- [ ] 2.1 Add `@supexon/tuyau` as a workspace dependency of `apps/erp`.
- [ ] 2.2 Add `@supexon/tuyau` as a workspace dependency of `apps/crm`.
- [ ] 2.3 Add `@supexon/tuyau` as a workspace dependency of `apps/pdv`.
- [ ] 2.4 Replace ERP `src/lib/api.ts` stub behavior with a thin shared-client re-export.
- [ ] 2.5 Replace CRM `src/lib/api.ts` stub behavior with a thin shared-client re-export.
- [ ] 2.6 Replace PDV `src/lib/api.ts` stub behavior with a thin shared-client re-export.
- [ ] 2.7 Add frontend `.env.example` files documenting `VITE_API_URL` where missing.

## 3. Guardrails And Documentation

- [ ] 3.1 Add an automated guard that detects direct `fetch(` or standalone app-local API client implementations in frontend app source outside approved boundaries.
- [ ] 3.2 Wire the guard into an appropriate package or root script so it can be run during validation.
- [ ] 3.3 Document the frontend API consumption pattern, including imports, base URL config, generated contract ownership and no-direct-client rule.
- [ ] 3.4 Update only F02-US02 checkboxes in `docs/rfc-mvp.md` whose implementation and validation evidence exists in this change.

## 4. Verification

- [ ] 4.1 Run `pnpm --filter @supexon/api build` or the required codegen-producing command if generated contracts need refresh.
- [ ] 4.2 Run `pnpm --filter @supexon/tuyau typecheck`.
- [ ] 4.3 Run `pnpm --filter @supexon/tuyau build`.
- [ ] 4.4 Run typecheck/build for each touched frontend app: ERP, CRM and PDV.
- [ ] 4.5 Run the direct API bypass guard and confirm it passes.
- [ ] 4.6 Run `openspec instructions apply --change implement-f02-type-safe-api-contracts --json` and confirm all tasks are complete.
- [ ] 4.7 Review `git status --short --branch` and generated-file changes before finishing.
