## 1. Package Foundations

- [ ] 1.1 Create `packages/shared` with `package.json`, `src/index.ts`, `tsconfig.json`, and scripts for `build`, `typecheck`, `lint`, and `test` where applicable.
- [ ] 1.2 Add framework-agnostic baseline exports to `packages/shared` without React, AdonisJS, Lucid, or frontend-specific dependencies.
- [ ] 1.3 Create `packages/tuyau` with `package.json`, `src/index.ts`, `tsconfig.json`, and scripts for `build`, `typecheck`, `lint`, and `test` where applicable.
- [ ] 1.4 Keep `packages/tuyau` as a minimal integration boundary without API-generated contract imports, domain endpoint calls, or frontend wiring.

## 2. Workspace Commands

- [ ] 2.1 Review root `package.json` and `turbo.json` against the F01 command requirements.
- [ ] 2.2 Adjust root or package scripts only where needed so `dev`, `build`, `typecheck`, `test`, `lint`, and `format` are coherent across the workspace.
- [ ] 2.3 Add or normalize missing scripts for packages affected by root Turbo tasks, including `apps/portal` `typecheck`, `lint`, and `test` coverage or deliberate no-op placeholders.

## 3. Documentation And Review Workflow

- [ ] 3.1 Update `README.md` so the documented app/package layout matches the actual repository after F01.
- [ ] 3.2 Update README command examples so they match available root and package scripts.
- [ ] 3.3 Add `.github/pull_request_template.md` with a checklist requiring RFC review/update and validation evidence.
- [ ] 3.4 Update only the F01 checkboxes in `docs/rfc-mvp.md` that are completed by this implementation.

## 4. Verification

- [ ] 4.1 Run focused package checks for `@supexon/shared` and `@supexon/tuyau`.
- [ ] 4.2 Run root workspace validation commands relevant to F01, including at least `pnpm typecheck`, `pnpm build`, `pnpm lint`, and `pnpm test` when available.
- [ ] 4.3 Run `openspec status --change implement-f01-monorepo-foundation` and verify the change is apply-ready.
- [ ] 4.4 Review `git status --short --branch` and generated-file changes before finishing.
