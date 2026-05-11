## ADDED Requirements

### Requirement: Shared Tuyau package exposes typed API client boundary

The `@supexon/tuyau` package SHALL expose the shared API client boundary for frontend apps using generated API registry/data contracts from `@supexon/api`.

#### Scenario: Shared package exports client utilities

- **WHEN** a frontend package imports from `@supexon/tuyau`
- **THEN** it can access a typed API client or client factory without importing generated API registry files directly

#### Scenario: Generated API contracts stay source-owned

- **WHEN** the shared package needs API contract types
- **THEN** it imports them from `@supexon/api` exports instead of copying or manually editing generated files

### Requirement: API base URL is environment-driven

The shared API client SHALL resolve the API base URL from frontend environment configuration with a local development fallback.

#### Scenario: Environment variable is configured

- **WHEN** `VITE_API_URL` is defined for a frontend app
- **THEN** the shared client uses that value as the API base URL

#### Scenario: Environment variable is missing

- **WHEN** `VITE_API_URL` is not defined for local development
- **THEN** the shared client falls back to the documented local API URL

#### Scenario: Frontend env example documents API URL

- **WHEN** a developer reads a frontend app `.env.example`
- **THEN** it documents the API base URL variable consumed by the shared client

### Requirement: Frontend apps consume the shared typed client

ERP, CRM and PDV SHALL use the shared `@supexon/tuyau` client boundary instead of maintaining independent app-local HTTP clients.

#### Scenario: ERP uses shared client boundary

- **WHEN** ERP code needs the Supexon API client
- **THEN** it imports the shared client boundary from `@supexon/tuyau` directly or through a thin app-local re-export

#### Scenario: CRM uses shared client boundary

- **WHEN** CRM code needs the Supexon API client
- **THEN** it imports the shared client boundary from `@supexon/tuyau` directly or through a thin app-local re-export

#### Scenario: PDV uses shared client boundary

- **WHEN** PDV code needs the Supexon API client
- **THEN** it imports the shared client boundary from `@supexon/tuyau` directly or through a thin app-local re-export

### Requirement: Direct API bypasses are guarded

The repository SHALL provide an automated guard that rejects direct API consumption patterns in frontend app source once the shared client boundary exists.

#### Scenario: Direct fetch is introduced in frontend source

- **WHEN** a frontend source file introduces direct `fetch(` usage for API calls outside an explicitly allowed boundary
- **THEN** the guard command fails

#### Scenario: App-local standalone client is introduced

- **WHEN** a frontend app introduces a standalone API client implementation instead of using `@supexon/tuyau`
- **THEN** the guard command fails or reports the violation

### Requirement: Frontend API consumption pattern is documented

The repository SHALL document how Supexon frontend apps consume API contracts through the shared Tuyau package.

#### Scenario: Developer needs to call the API from a frontend app

- **WHEN** a developer reads the frontend API consumption documentation
- **THEN** it explains imports, base URL configuration, generated contract ownership, and the rule against direct API clients

### Requirement: F02-US02 completion is evidence-based

F02-US02 checkboxes in `docs/rfc-mvp.md` SHALL be marked complete only when implementation and validation evidence exists in the same change.

#### Scenario: Type-safe contract item completed

- **WHEN** a F02-US02 item is implemented and verified
- **THEN** the matching RFC checkbox may be changed from `[ ]` to `[x]`

#### Scenario: Type-safe contract item not implemented

- **WHEN** a F02-US02 item is outside this change or lacks validation evidence
- **THEN** its RFC checkbox remains unchecked
