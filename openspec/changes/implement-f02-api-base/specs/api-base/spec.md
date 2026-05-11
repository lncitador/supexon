## ADDED Requirements

### Requirement: API uses PostgreSQL-only runtime configuration

The API package SHALL use PostgreSQL as its only configured database runtime and SHALL NOT keep SQLite runtime dependencies when no code path uses SQLite.

#### Scenario: SQLite runtime is absent

- **WHEN** a developer inspects `apps/api/package.json`
- **THEN** SQLite runtime packages are not listed unless an active API configuration or test path requires them

#### Scenario: Database config remains PostgreSQL

- **WHEN** the API boots its database configuration
- **THEN** the configured Lucid connection uses PostgreSQL through `DATABASE_URL`

### Requirement: API environment examples are PostgreSQL aligned

The API SHALL document and provide local environment defaults that match the PostgreSQL `DATABASE_URL` contract.

#### Scenario: Development environment example

- **WHEN** a developer reads `apps/api/.env.example`
- **THEN** it documents `DATABASE_URL` as the PostgreSQL connection input expected by the API

#### Scenario: Test environment defaults

- **WHEN** a developer runs `pnpm --filter @supexon/api test`
- **THEN** the API can boot using repo-local test defaults without requiring inline environment variables in the package script

### Requirement: API exposes minimum technical endpoint coverage

The API SHALL have a minimal automated test suite covering base technical endpoints and auth boundary behavior.

#### Scenario: Root endpoint responds

- **WHEN** the minimal API suite requests `GET /`
- **THEN** the response confirms the API identity and healthy status

#### Scenario: Health endpoint responds

- **WHEN** the minimal API suite requests `GET /health`
- **THEN** the response confirms healthy status

#### Scenario: Auth validation rejects invalid input

- **WHEN** the minimal API suite submits invalid auth payloads
- **THEN** the API responds with validation errors instead of successful authentication

#### Scenario: Protected profile rejects anonymous access

- **WHEN** the minimal API suite requests the protected profile route without credentials
- **THEN** the API rejects the request as unauthorized

### Requirement: API base validation commands pass

The API base SHALL be verified by focused API typecheck, build, and test commands.

#### Scenario: API typecheck passes

- **WHEN** a developer runs `pnpm --filter @supexon/api typecheck`
- **THEN** TypeScript completes successfully

#### Scenario: API build passes

- **WHEN** a developer runs `pnpm --filter @supexon/api build`
- **THEN** Adonis builds the API successfully

#### Scenario: API tests pass

- **WHEN** a developer runs `pnpm --filter @supexon/api test`
- **THEN** the minimal API test suite completes successfully

### Requirement: F02-US01 RFC completion is evidence-based

F02-US01 checkboxes in `docs/rfc-mvp.md` SHALL be marked complete only when implementation and validation evidence exists in the same change.

#### Scenario: API base item completed

- **WHEN** a F02-US01 item is implemented and verified
- **THEN** the matching RFC checkbox may be changed from `[ ]` to `[x]`

#### Scenario: API base item not implemented

- **WHEN** a F02-US01 item is outside this change or lacks validation evidence
- **THEN** its RFC checkbox remains unchecked
