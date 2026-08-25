import assert from "node:assert/strict";
import test from "node:test";

import { ProjectRegistry, normalizeProject } from "../src/projects.js";

test("SkyProjects normalizes, stores, and lists deterministically", () => {
  const registry = new ProjectRegistry();
  registry.create({ id: "project:b", organizationId: "org:1", name: " Beta ", ownerId: "user:1" });
  registry.create({ id: "project:a", organizationId: "org:1", name: "Alpha", ownerId: "user:2", status: "active" });
  assert.deepEqual(registry.listForOrganization("org:1").map((p) => p.id), ["project:a", "project:b"]);
  assert.equal(registry.listForOrganization("org:1")[1]?.persistencePerformed, false);
});

test("SkyProjects enforces ownership and terminal completion", () => {
  const registry = new ProjectRegistry();
  registry.create({ id: "project:a", organizationId: "org:1", name: "Alpha", ownerId: "user:1" });
  assert.throws(() => registry.transition("project:a", "user:2", "active"), /owner required/);
  assert.equal(registry.transition("project:a", "user:1", "completed").status, "completed");
  assert.throws(() => registry.transition("project:a", "user:1", "active"), /terminal/);
});

test("SkyProjects rejects malformed input and duplicates", () => {
  const registry = new ProjectRegistry();
  registry.create({ id: "project:a", organizationId: "org:1", name: "Alpha", ownerId: "user:1" });
  assert.throws(() => registry.create({ id: "project:a", organizationId: "org:1", name: "Other", ownerId: "user:1" }), /duplicate/);
  assert.throws(() => normalizeProject({ id: "bad id", organizationId: "org:1", name: "Alpha", ownerId: "user:1" }), /bounded identifier/);
});
