import assert from "node:assert/strict";
import test from "node:test";

import { ContractRegistry, Organization, createContractForOrganization } from "../src/index.js";

function input() {
  return {
    id: "contract-1",
    organizationId: "org-1",
    title: "Service Agreement Metadata",
    partyIds: ["party-a", "party-b"],
    effectiveAt: 100,
    expiresAt: 200,
  };
}

test("records bounded contract metadata without legal or signature claims", () => {
  const registry = new ContractRegistry();
  const record = registry.create(input());
  assert.equal(record.status, "draft");
  assert.equal(record.legalValidityVerified, false);
  assert.equal(record.signaturePerformed, false);
  assert.deepEqual(record.partyIds, ["party-a", "party-b"]);
});

test("supports explicit bounded lifecycle transitions", () => {
  const registry = new ContractRegistry();
  registry.create(input());
  assert.equal(registry.transition("contract-1", "active").status, "active");
  assert.equal(registry.transition("contract-1", "ended").status, "ended");
  assert.throws(() => registry.transition("contract-1", "active"), /invalid contract status transition/);
});

test("rejects invalid parties, dates, and duplicate IDs", () => {
  const registry = new ContractRegistry();
  assert.throws(() => registry.create({ ...input(), partyIds: ["only-one"] }), /partyIds/);
  assert.throws(() => registry.create({ ...input(), partyIds: ["same", "same"] }), /duplicate party/);
  assert.throws(() => registry.create({ ...input(), expiresAt: 99 }), /after effectiveAt/);
  registry.create(input());
  assert.throws(() => registry.create(input()), /already exists/);
});

test("integrates creation with existing organization admin roles", () => {
  const organization = new Organization("org-1", "Example Org", 5, "owner-1");
  organization.addMember("owner-1", "admin-1", "admin");
  organization.addMember("owner-1", "member-1", "member");
  const registry = new ContractRegistry();

  const record = createContractForOrganization(registry, organization, "admin-1", input());
  assert.equal(record.organizationId, "org-1");
  assert.throws(
    () => createContractForOrganization(registry, organization, "member-1", { ...input(), id: "contract-2" }),
    /admin role required/,
  );
});

test("returns immutable defensive party arrays and deterministic organization lists", () => {
  const registry = new ContractRegistry();
  const first = registry.create(input());
  registry.create({ ...input(), id: "contract-0", title: "Another Agreement" });

  assert.throws(() => (first.partyIds as string[]).push("mutate"));
  assert.deepEqual(registry.listForOrganization("org-1").map((item) => item.id), ["contract-0", "contract-1"]);
});
