export type OrgRole = "owner" | "admin" | "member";

const ID_RE = /^[A-Za-z0-9._-]{1,96}$/;
const MAX_SEATS = 10_000;

export class Organization {
  readonly #members = new Map<string, OrgRole>();

  constructor(
    readonly id: string,
    readonly name: string,
    readonly seatLimit: number,
    ownerId: string
  ) {
    if (!ID_RE.test(id) || !ID_RE.test(ownerId)) throw new Error("invalid identifier");
    if (name.trim().length < 2 || name.trim().length > 120) throw new Error("invalid organization name");
    if (!Number.isInteger(seatLimit) || seatLimit < 1 || seatLimit > MAX_SEATS) throw new Error("invalid seat limit");
    this.#members.set(ownerId, "owner");
  }

  addMember(actorId: string, userId: string, role: Exclude<OrgRole, "owner"> = "member"): void {
    this.#requireAdmin(actorId);
    if (!ID_RE.test(userId)) throw new Error("invalid user id");
    if (!this.#members.has(userId) && this.#members.size >= this.seatLimit) throw new Error("seat limit reached");
    if (this.#members.get(userId) === "owner") throw new Error("owner role cannot be overwritten");
    this.#members.set(userId, role);
  }

  removeMember(actorId: string, userId: string): void {
    this.#requireAdmin(actorId);
    if (this.#members.get(userId) === "owner") throw new Error("owner cannot be removed");
    this.#members.delete(userId);
  }

  roleOf(userId: string): OrgRole | undefined {
    return this.#members.get(userId);
  }

  snapshot(): ReadonlyArray<{ userId: string; role: OrgRole }> {
    return Object.freeze([...this.#members.entries()]
      .map(([userId, role]) => Object.freeze({ userId, role }))
      .sort((a, b) => a.userId.localeCompare(b.userId)));
  }

  #requireAdmin(actorId: string): void {
    const role = this.#members.get(actorId);
    if (role !== "owner" && role !== "admin") throw new Error("admin role required");
  }
}

export {
  ProjectRegistry,
  createProjectForOrganization,
  normalizeProject,
  type OrganizationMembershipLookup,
  type ProjectInput,
  type ProjectSnapshot,
  type ProjectStatus,
} from "./projects.js";
