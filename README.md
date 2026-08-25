# SkyEnterprise Core

**Status: engineering beta / reusable domain core.** This repository provides bounded organization membership and role rules for SKYCOIN4444 business components.

## Supported today

- organization identity/name validation;
- configurable seat limits;
- owner/admin/member roles;
- admin-gated membership changes;
- protection against removing or overwriting the owner;
- deterministic membership snapshots;
- strict TypeScript checks and tests.

## Not claimed

This is not a CRM, ERP, HRIS, billing system, identity provider, SSO platform, durable tenant database, audit/compliance platform, or production enterprise deployment. Production use requires durable storage, authentication/RBAC integration, tenant isolation, audit logging, billing/entitlement services where applicable, observability, backups, and deployment evidence.

## Development

```bash
npm install
npm run check
npm test
```

## Integration

The `Organization` class is intended as a reusable policy primitive behind stronger SKYCOIN4444 enterprise APIs rather than as a standalone hosted control plane.

## License

See `LICENSE`.
