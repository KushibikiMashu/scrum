import {Member} from "@/company";

export class Project {
  constructor(
    public readonly team: ScrumTeam,
    // public readonly sprints: Sprint[],
  ) {
  }

  // pickCurrentSprint(): Sprint
}

export const ScrumMemberRole = {
  ProductOwner: 'product_owner',
  ScrumMaster: 'scrum_master',
  Developer: 'developer',
} as const;

export type ScrumMemberRoleType = typeof ScrumMemberRole[keyof typeof ScrumMemberRole];

export class ScrumTeam {
  constructor(
    public readonly productOwner: ProductOwner,
    public readonly scrumMaster: ScrumMaster,
    public readonly developers: Developer[],
  ) {}
}

export class ProductOwner {
  constructor(
    public readonly roles: ScrumMemberRoleType[],
    public readonly member: Member
  ) {}

  validate() {
    if (this.roles.includes(ScrumMemberRole.ScrumMaster)) {
      throw new Error('ProductOwner cannot be ScrumMaster');
    }
  }
}

export class ScrumMaster {
  constructor(
    public readonly roles: ScrumMemberRoleType[],
    public readonly member: Member
  ) {}

  validate() {
    if (this.roles.includes(ScrumMemberRole.ProductOwner)) {
      throw new Error('ScrumMaster cannot be ProductOwner');
    }
  }
}

export class Developer {
  constructor(
    public readonly role: ScrumMemberRoleType = ScrumMemberRole.Developer,
    public readonly member: Member
  ) {}

  validate() {
    if (this.role === ScrumMemberRole.ProductOwner) {
      throw new Error('Developer cannot be ProductOwner');
    }
    if (this.role === ScrumMemberRole.ScrumMaster) {
      throw new Error('Developer cannot be ScrumMaster');
    }
  }
}
