## ADDED Requirements

### Requirement: Workspace includes foundation packages

The monorepo SHALL include operational `packages/shared` and `packages/tuyau` workspace packages with package metadata, TypeScript entrypoints, and validation scripts.

#### Scenario: Shared package exists

- **WHEN** a developer inspects the workspace packages
- **THEN** `packages/shared` exists as `@supexon/shared` with a TypeScript source entrypoint and package scripts for validation

#### Scenario: Tuyau package exists

- **WHEN** a developer inspects the workspace packages
- **THEN** `packages/tuyau` exists as `@supexon/tuyau` with a TypeScript source entrypoint and package scripts for validation

### Requirement: Root commands cover workspace validation

The root package SHALL expose consistent workspace-level scripts for development, build, typecheck, test, lint, and format using the repository's Turborepo workflow.

#### Scenario: Root scripts are present

- **WHEN** a developer reads the root `package.json`
- **THEN** the `dev`, `build`, `typecheck`, `test`, `lint`, and `format` scripts are present and route through workspace orchestration

#### Scenario: New packages participate in validation

- **WHEN** a developer runs the relevant root build or typecheck workflow
- **THEN** the new foundation packages are included through workspace package scripts

#### Scenario: Apps expose a coherent script surface

- **WHEN** a developer inspects app package scripts after F01 implementation
- **THEN** API, ERP, CRM, PDV, Portal, and Example expose scripts compatible with the root workspace commands or deliberate no-op placeholders for unavailable checks

### Requirement: Tuyau package remains a foundation boundary

The `@supexon/tuyau` package SHALL establish the workspace package boundary for typed API consumption without implementing domain endpoint calls or frontend wiring in F01.

#### Scenario: Tuyau package avoids domain assumptions

- **WHEN** a developer reads `packages/tuyau` after F01 implementation
- **THEN** it exports a minimal package surface without hard-coded ERP, CRM, PDV, or domain endpoint methods

#### Scenario: API contract wiring is deferred

- **WHEN** a developer reviews the F01 implementation
- **THEN** generated API contract consumption, base URL configuration, and frontend integration remain deferred to F02-US02

### Requirement: README matches current monorepo foundation

The README SHALL describe the current F01 workspace layout and command surface without claiming incomplete domain behavior as already implemented.

#### Scenario: README lists current packages

- **WHEN** a developer reads the architecture or workspace section
- **THEN** the documented apps and packages match the directories present after F01 implementation

#### Scenario: README lists usable commands

- **WHEN** a developer reads the development command section
- **THEN** the listed root and package commands match scripts available in the repository

### Requirement: Pull request checklist covers RFC updates

The repository SHALL provide a pull request checklist that requires authors to evaluate whether `docs/rfc-mvp.md` must be updated.

#### Scenario: Functional MVP change

- **WHEN** a pull request changes MVP scope or completes an RFC checklist item
- **THEN** the PR checklist requires the author to update `docs/rfc-mvp.md` in the same change or explain why no RFC update is needed

#### Scenario: Evidence for completed tasks

- **WHEN** a pull request marks an RFC checkbox as complete
- **THEN** the checklist requires repository evidence and validation commands to be included in the PR

### Requirement: F01 RFC completion is evidence-based

F01 checkboxes in `docs/rfc-mvp.md` SHALL be marked complete only when the implementation includes matching repository evidence.

#### Scenario: Package checkbox completion

- **WHEN** `packages/shared` or `packages/tuyau` is created with package metadata and source files
- **THEN** the corresponding F01 checkbox may be changed from `[ ]` to `[x]`

#### Scenario: Documentation checkbox completion

- **WHEN** README and PR checklist changes are present in the same implementation
- **THEN** the matching F01 documentation checklist items may be changed from `[ ]` to `[x]`
