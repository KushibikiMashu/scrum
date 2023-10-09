import {Member} from "@/company";
import {Increment, ProductGoal} from "@/scrum";
import {ID} from "@/common";

export class Project {
  constructor(
    public readonly id: ID,
    public readonly name: string,

    // 必要かはわからないのでコメントアウトしておく
    // public readonly product: Product,
    // public readonly team: ScrumTeam,
    // public readonly sprints: Sprint[],
  ) {
  }

  // pickCurrentSprint(): Sprint
}

export interface ProjectRepositoryInterface {
  save(project: Project): Promise<Project>
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

    public readonly increment: Increment[],
    public readonly goals: ProductGoal[],
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
