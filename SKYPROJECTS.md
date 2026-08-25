# SkyProjects — Wave 2 Slot #126 / Lane 12

SkyProjects is an engineering-beta project/work-management domain core for SKYCOIN4444 enterprise components.

It validates project, organization, and owner identifiers; bounds names and registry capacity; supports deterministic organization-scoped listings; and enforces owner-only status transitions with completed projects terminal. Returned snapshots explicitly report `persistencePerformed: false`.

## Integration contract

Enterprise APIs may use `normalizeProject` before persistence and `ProjectRegistry` for deterministic local validation/testing. Callers remain responsible for authentication, authorization, durable storage, tenancy, audit logging, notifications, task assignment, billing, and external side effects.

## Security and truth boundary

Owner ID equality is a caller-supplied domain check, not authentication. This library does not provide durable project storage, collaborative editing, live synchronization, production access control, compliance guarantees, or deployment.
