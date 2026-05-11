## Why

F01 is the remaining foundation work for making the Supexon monorepo operable as the shared base for API, ERP, CRM, PDV, Portal, and internal packages. Completing it now reduces drift between `docs/rfc-mvp.md`, the README, root scripts, and the actual workspace layout before deeper domain work starts.

## What Changes

- Create `packages/shared` as the home for framework-agnostic shared types, constants, and utilities.
- Create `packages/tuyau` as the internal package that will own the typed API client integration surface.
- Align root package scripts so development, build, typecheck, test, lint, and format can be run consistently across workspace packages.
- Update README content to reflect the actual monorepo state and the current F01 package layout.
- Add a PR checklist that requires contributors to update `docs/rfc-mvp.md` when a change affects MVP scope or task completion.
- Update `docs/rfc-mvp.md` checkboxes for F01 only when repository evidence exists in the same implementation change.

## Capabilities

### New Capabilities

- `monorepo-foundation`: Defines the expected workspace structure, root commands, shared packages, Tuyau package shell, README alignment, and PR checklist behavior for the Supexon monorepo.

### Modified Capabilities

- None.

## Impact

- Affected workspace files: `package.json`, `pnpm-workspace.yaml`, `README.md`, and `docs/rfc-mvp.md`.
- New package areas: `packages/shared` and `packages/tuyau`.
- New repository workflow metadata for pull request checklist enforcement.
- No domain CRUD, controller, route, database, frontend feature, or business logic implementation is included in this F01 change.
