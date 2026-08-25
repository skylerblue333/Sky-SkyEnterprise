import assert from "node:assert/strict";
import test from "node:test";
import { Organization } from "../src/index.js";

test("owner can add members within seat limit", () => {
  const org = new Organization("org.one", "Org One", 2, "user.owner");
  org.addMember("user.owner", "user.member");
  assert.equal(org.roleOf("user.member"), "member");
  assert.throws(() => org.addMember("user.owner", "user.extra"), /seat limit/);
});

test("non-admin cannot mutate membership", () => {
  const org = new Organization("org.one", "Org One", 3, "user.owner");
  org.addMember("user.owner", "user.member");
  assert.throws(() => org.addMember("user.member", "user.other"), /admin role/);
});

test("owner cannot be removed or overwritten", () => {
  const org = new Organization("org.one", "Org One", 3, "user.owner");
  assert.throws(() => org.removeMember("user.owner", "user.owner"), /owner cannot/);
  assert.throws(() => org.addMember("user.owner", "user.owner", "admin"), /owner role/);
});
