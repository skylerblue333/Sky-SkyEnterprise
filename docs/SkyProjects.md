# SkyProjects (#126, Lane 12)

**Status:** engineering-beta enterprise domain core.

SkyProjects provides a deterministic in-memory project registry for SKYCOIN4444 enterprise components. It validates project, organization, and owner identifiers; normalizes names and statuses; rejects duplicate project IDs; enforces owner-only status transitions; treats `completed` as terminal; and returns deterministic organization-scoped listings.

## SKYCOIN4444 integration contract

Callers supply already-authenticated identifiers through `ProjectInput`. `organizationId` is the intended integration key with SKYCOIN4444 organization/tenant components, while `ownerId` is the intended identity reference. This library does not authenticate either identifier and does not grant organization membership. API/service layers must authenticate the caller, verify organization membership/authorization, then invoke this domain core.

The exported `persistencePerformed: false` field is an explicit boundary signal: all state is process-local and ephemeral. A production adapter would need durable storage, optimistic concurrency/idempotency rules, tenant isolation, audit events, observability, backup/recovery, and deployment evidence.

## Security boundaries

- Input identifiers and names are bounded and validated before storage.
- Mutating transitions require the caller-supplied `actorId` to match the recorded owner.
- Completed projects cannot be reopened by this core.
- No secrets, tokens, credentials, payment data, external requests, arbitrary code execution, or filesystem access are handled here.
- `ownerId` checks are domain invariants, not authentication or production authorization enforcement.

## Not claimed

SkyProjects is not a hosted project-management service, durable database, RBAC service, workflow engine, task tracker, billing system, compliance control, or production deployment. It does not send notifications, execute jobs, create external resources, or prove identity/tenant membership.

## Verification

`npm run check` performs strict TypeScript validation. `npm test` builds the package and runs deterministic Node contract tests covering normalization/listing, ownership, terminal completion, malformed input, and duplicate protection.
