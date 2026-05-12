## ADDED Requirements

### Requirement: Authenticated users can create tenants

The API SHALL allow an authenticated user to create a tenant and automatically become an `owner` member of that tenant.

#### Scenario: Tenant is created by authenticated user

- **WHEN** an authenticated user submits a valid tenant creation payload
- **THEN** the API creates the tenant, creates a membership for the user with role `owner`, and returns the serialized tenant

#### Scenario: Tenant payload is invalid

- **WHEN** an authenticated user submits an invalid tenant creation payload
- **THEN** the API rejects the request with validation errors and does not create a tenant or membership

### Requirement: Users can list accessible tenants

The API SHALL return only active tenants that the authenticated user can access through `tenant_users` membership.

#### Scenario: User lists tenant memberships

- **WHEN** an authenticated user requests their accessible tenants
- **THEN** the API returns tenants where the user has a membership and excludes tenants without membership

#### Scenario: Anonymous user lists tenants

- **WHEN** an unauthenticated request attempts to list accessible tenants
- **THEN** the API rejects the request as unauthorized

### Requirement: Users can select an active tenant

The API SHALL validate active tenant selection against the authenticated user's membership before returning tenant context.

#### Scenario: User selects accessible tenant

- **WHEN** an authenticated user selects a tenant where they have membership
- **THEN** the API returns the active tenant and the user's membership role for that tenant

#### Scenario: User selects inaccessible tenant

- **WHEN** an authenticated user selects a tenant where they do not have membership
- **THEN** the API rejects the request and does not establish active tenant context

#### Scenario: User selects inactive tenant

- **WHEN** an authenticated user selects an inactive tenant
- **THEN** the API rejects the request and does not establish active tenant context

### Requirement: Tenant-scoped requests require active tenant context

Tenant-scoped API routes SHALL require an active tenant identifier, verify the authenticated user's membership, and expose the resolved tenant and membership to downstream handlers.

#### Scenario: Tenant context is valid

- **WHEN** an authenticated request provides an active tenant id for a tenant where the user has membership
- **THEN** downstream route handlers can read the resolved tenant id and membership role from request context

#### Scenario: Tenant context is missing

- **WHEN** an authenticated request reaches a tenant-scoped route without an active tenant id
- **THEN** the API rejects the request before executing the route handler

#### Scenario: Tenant context does not belong to user

- **WHEN** an authenticated request provides a tenant id where the user has no membership
- **THEN** the API rejects the request before executing the route handler

### Requirement: Tenant membership management is role-protected

The API SHALL allow authorized tenant members to list, create, update, and remove tenant memberships according to the initial role rules.

#### Scenario: Owner manages tenant members

- **WHEN** an `owner` member submits a valid membership management request inside the active tenant
- **THEN** the API performs the requested membership action and returns serialized membership data

#### Scenario: Admin manages non-owner tenant members

- **WHEN** an `admin` member submits a valid membership management request for a non-owner member inside the active tenant
- **THEN** the API performs the requested membership action and returns serialized membership data

#### Scenario: Non-admin member manages tenant members

- **WHEN** an `operator`, `seller`, or `viewer` submits a membership management request inside the active tenant
- **THEN** the API rejects the request as forbidden

#### Scenario: Invalid membership role is submitted

- **WHEN** a membership management request submits a role outside `owner`, `admin`, `operator`, `seller`, and `viewer`
- **THEN** the API rejects the request with validation errors

### Requirement: Initial tenant roles are enforced consistently

The API SHALL treat `owner`, `admin`, `operator`, `seller`, and `viewer` as the complete initial role set for F03 authorization decisions.

#### Scenario: Supported role is persisted

- **WHEN** an authorized request creates or updates a membership with a supported role
- **THEN** the API persists that role exactly as one of `owner`, `admin`, `operator`, `seller`, or `viewer`

#### Scenario: Unsupported role is rejected

- **WHEN** any API boundary receives an unsupported tenant role
- **THEN** the API rejects the request before persisting the membership

### Requirement: PostgreSQL tenant context is set for tenant-scoped requests

The API SHALL set PostgreSQL `app.tenant_id` for the active tenant before tenant-scoped database work and reset the context after the request completes.

#### Scenario: Tenant-scoped request executes database queries

- **WHEN** a tenant-scoped request has valid active tenant context
- **THEN** database work during that request can read the same tenant id from `current_setting('app.tenant_id', true)`

#### Scenario: Tenant-scoped request finishes

- **WHEN** a tenant-scoped request completes or raises an error
- **THEN** the API resets the PostgreSQL tenant context before the connection is reused

### Requirement: Tenant-owned data is isolated by RLS

The database SHALL enforce row-level security for tenant-owned tables using the active PostgreSQL tenant context.

#### Scenario: Query runs with tenant context

- **WHEN** a query reads tenant-owned rows while `app.tenant_id` is set
- **THEN** PostgreSQL returns only rows whose `tenant_id` matches the active context

#### Scenario: Write runs with tenant context

- **WHEN** a query inserts or updates tenant-owned rows while `app.tenant_id` is set
- **THEN** PostgreSQL permits only rows whose `tenant_id` matches the active context

#### Scenario: Query runs without tenant context

- **WHEN** tenant-owned data is queried without an active PostgreSQL tenant context
- **THEN** PostgreSQL prevents access to tenant-owned rows

### Requirement: F03 completion is evidence-based

F03 checkboxes in `docs/rfc-mvp.md` SHALL be marked complete only when implementation and validation evidence exists in the same change.

#### Scenario: F03 item is implemented and verified

- **WHEN** an F03 checklist item has source implementation and passing validation evidence
- **THEN** the matching RFC checkbox may be changed from `[ ]` to `[x]`

#### Scenario: F03 item is outside this change or unverified

- **WHEN** an F03 checklist item is not implemented or lacks validation evidence
- **THEN** its RFC checkbox remains unchecked
