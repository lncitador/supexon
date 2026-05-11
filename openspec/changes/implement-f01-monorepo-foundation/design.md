## Context

F01 in `docs/rfc-mvp.md` is partially complete: the workspace already has `apps/api`, `apps/example`, `apps/erp`, `apps/crm`, `apps/pdv`, `apps/portal`, `packages/ui`, `pnpm-workspace.yaml`, root scripts, and `turbo.json`. The remaining foundation gaps are the missing `packages/shared` and `packages/tuyau`, README drift against the actual project state, and no PR checklist that forces RFC updates when MVP scope changes.

This change is planning-only for the monorepo foundation. It must not implement domain CRUD, API controllers, frontend product flows, database changes, or Tuyau runtime business integration beyond a package shell that can be built on in later features.

## Goals / Non-Goals

**Goals:**

- Add `packages/shared` as a framework-agnostic internal package with TypeScript source, package metadata, and validation scripts.
- Add `packages/tuyau` as the internal API client package shell that can depend on API-generated contracts without coupling F01 to domain endpoints.
- Keep root commands consistent with the existing Turborepo workflow: `dev`, `build`, `test`, `lint`, `format`, and `typecheck`.
- Update README sections that describe the workspace so they match the repository after F01.
- Add a pull request checklist that explicitly asks whether `docs/rfc-mvp.md` needs updates and requires evidence when checkboxes are marked complete.
- Update F01 checkboxes only for items delivered by the implementation commit.

**Non-Goals:**

- Do not create API domain CRUD, routes, controllers, validators, or business services.
- Do not implement frontend screens or connect ERP/CRM/PDV to real API endpoints.
- Do not introduce RLS, tenant selection, auth changes, or database migrations.
- Do not make `packages/tuyau` the final production client for all frontends; this change only creates the package boundary and baseline exports.
- Do not mark non-F01 RFC items complete.

## Decisions

### Use package shells with strict TypeScript validation

`packages/shared` and `packages/tuyau` will be real workspace packages with `package.json`, `src/index.ts`, and `tsconfig.json`. They should expose stable package names (`@supexon/shared`, `@supexon/tuyau`) and pass `typecheck`/`build` through the same root command flow.

Alternative considered: create empty directories with `.gitkeep`. That would satisfy the shape superficially but would not prove package resolution or root script behavior.

### Keep shared package framework-agnostic

`packages/shared` should avoid React, AdonisJS, Lucid, and frontend-specific dependencies. It can start with neutral constants/types that are safe to consume from API and frontend packages.

Alternative considered: put UI helpers or API route types into `shared`. That would blur ownership with `packages/ui` and `packages/tuyau`.

### Keep Tuyau package as the integration boundary, not a domain implementation

`packages/tuyau` should establish the import surface for future typed API consumption. It can depend on `@tuyau/core` and reference the API package exports if needed, but F01 should not add domain-specific calls or frontend integration work.

Alternative considered: wire every frontend to `@supexon/tuyau` immediately. That belongs to F02 because it changes API consumption behavior and may require route/client decisions beyond the monorepo foundation.

### Prefer repository-native PR template

Add a GitHub pull request template under `.github/pull_request_template.md`. The checklist should include an explicit RFC item and room for validation commands.

Alternative considered: document the checklist only in README. That is easier to miss during review and does not place the reminder where PR authors need it.

### Update README from current repository evidence

README changes should describe the current app/package layout and commands, not future desired state that is not yet present. Any database/domain modeling drift should be avoided unless directly part of F01.

Alternative considered: rewrite README around the whole MVP. That would broaden the F01 implementation and risk mixing foundation work with F02+ domain planning.

## Risks / Trade-offs

- Package shells may look too thin → Mitigation: include real package metadata, source exports, and validation scripts so they are operational boundaries.
- `packages/tuyau` may need later redesign when API routes mature → Mitigation: keep exports minimal and avoid domain-specific assumptions.
- Root `turbo` commands can fail if package scripts are missing → Mitigation: ensure new packages define the relevant scripts expected by root tasks or intentionally document unsupported commands.
- README and RFC can drift again → Mitigation: add a PR checklist item that makes RFC updates part of review hygiene.
- Generated API artifacts can change during build → Mitigation: implementation must report generated file changes separately and avoid editing generated files manually.

## Migration Plan

1. Add the two package shells under `packages/shared` and `packages/tuyau`.
2. Wire package manifests and TypeScript configs to match existing workspace conventions.
3. Update root scripts only if needed to make existing F01 command expectations accurate.
4. Add the PR template checklist.
5. Update README and F01 checkboxes in `docs/rfc-mvp.md`.
6. Verify with package/root checks appropriate to the touched files.

Rollback is straightforward: revert the implementation commit. No database or runtime migration is involved.

## Open Questions

- Should `packages/tuyau` immediately import API generated registry/data types, or should it remain a neutral shell until F02-US02?
- Should `apps/portal` receive `typecheck` and `lint` scripts in this F01 implementation so root commands behave uniformly?
- Should the PR checklist be GitHub-specific only, or should a generic checklist also live in docs for non-GitHub workflows?
