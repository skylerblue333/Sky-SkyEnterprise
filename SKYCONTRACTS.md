# SkyContracts — Wave 2 Slot #134

**Lane:** 02  
**Status:** engineering beta / enterprise contract-metadata core.

SkyContracts adds bounded agreement metadata and lifecycle state to the existing SkyEnterprise domain package. It deliberately does not claim legal enforceability, electronic signatures, document generation, or external contract execution.

## Integration contract

`createContractForOrganization()` composes with the existing `Organization.roleOf()` boundary. Only organization owners/admins may create a contract record through that integration helper. This is a local domain-policy check, not authentication or legal authority verification.

Each record contains an organization ID, title, 2–32 bounded party identifiers, optional effective/expiration timestamps, and an explicit lifecycle status. Every snapshot reports:

- `legalValidityVerified: false`
- `signaturePerformed: false`

## Lifecycle

Supported transitions are intentionally narrow:

- draft -> active
- draft -> cancelled
- active -> ended
- active -> cancelled

Ended/cancelled records are terminal. Reapplying the current state is idempotent.

## Explicit limitations

SkyContracts does not store contract document bodies, generate PDFs, collect signatures, prove signer authority/identity, provide legal advice, evaluate jurisdictional validity, manage negotiation/redlines, execute payments, persist records durably, provide audit-grade retention, or establish production deployment.

A production contract system would additionally need authenticated identities, explicit organization authorization, durable/versioned document storage, audit logs, retention/privacy policies, signature-provider integration where applicable, correction/revocation workflows, and independent legal/security review.
