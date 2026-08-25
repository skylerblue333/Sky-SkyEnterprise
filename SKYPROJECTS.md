# SkyProjects — Wave 2 Slot #126 / Lane 12

SkyProjects is an engineering-beta project/work-management domain core for SKYCOIN4444 enterprise components.

It validates project, organization, and owner identifiers; bounds names and registry capacity; supports deterministic organization-scoped listings; and enforces owner-only status transitions with completed projects terminal. Returned snapshots explicitly report `persistencePerformed: false`.

## Integration contract

`createProjectForOrganization()` integrates with the existing SkyEnterprise organization core through its `id` and `roleOf()` contract. A project can be created in that path only when the project organization matches the supplied organization context and the proposed owner is already an organization member. This is covered by a deterministic integration test.

Enterprise APIs may also use `normalizeProject` before persistence and `ProjectRegistry` for deterministic local validation/testing. Callers remain responsible for authentication, authorization, durable storage, tenancy, audit logging, notifications, task assignment, billing, and external side effects.

## Security and truth boundary

Organization membership and owner-ID equality are caller-supplied domain checks, not authentication. This library does not provide durable project storage, collaborative editing, live synchronization, production access control, compliance guarantees, or deployment.
