import {Employee, Member} from "@/company";
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

export const isDeveloper = (scrumMember: ReturnType<ScrumTeam['getScrumMemberByEmployeeId']>): scrumMember is Developer => {
  return scrumMember?.isDeveloper() ?? false
}

export class ScrumTeam {
  constructor(
    public readonly id: ID,
    public readonly productOwner: ProductOwner,
    public readonly scrumMaster: ScrumMaster,
    public readonly developers: Developer[],

    public readonly increment: Increment[],
    public readonly goals: ProductGoal[],
  ) {}

  static createWithProductOwnerAndScrumMaster(productOwner: ProductOwner, scrumMaster: ScrumMaster) {
    return new ScrumTeam(ID.createAsNull(), productOwner, scrumMaster, [], [], [])
  }

  changeProductOwner(productOwner: ProductOwner) {
    return new ScrumTeam(this.id, productOwner, this.scrumMaster, this.developers, this.increment, this.goals)
  }

  changeScrumMaster(scrumMaster: ScrumMaster) {
    return new ScrumTeam(this.id, this.productOwner, scrumMaster, this.developers, this.increment, this.goals)
  }

  getScrumMemberByEmployeeId(employeeId: ID): ProductOwner | ScrumMaster | Developer | null {
    if (this.productOwner.member.employee.id.equals(employeeId)) return this.productOwner
    if (this.scrumMaster.member.employee.id.equals(employeeId)) return this.scrumMaster
    const developer = this.developers.find(developer => developer.member.employee.id.equals(employeeId))
    return developer ?? null
  }

  addDeveloper(developer: Developer) {
    return new ScrumTeam(this.id, this.productOwner, this.scrumMaster, [...this.developers, developer], this.increment, this.goals)
  }

  countScrumMembers(): number {
    return this.developers.length + 2
  }
}

export interface ScrumTeamRepositoryInterface {
  fetch(): Promise<ScrumTeam>
  exists(): Promise<boolean>
  save(scrumTeam: ScrumTeam): Promise<void>
  update(scrumTeam: ScrumTeam): Promise<void>
  delete(): Promise<void>
}

export class ProductOwner {
  constructor(
    public readonly roles: ScrumMemberRoleType[],
    public readonly member: Member
  ) {
    this.validate()
  }

  validate() {
    if (this.roles.includes(ScrumMemberRole.ScrumMaster)) {
      throw new Error('ProductOwner cannot be ScrumMaster');
    }
  }

  static createFromEmployee(employee: Employee) {
    return new ProductOwner(
      [ScrumMemberRole.ProductOwner],
      Member.createFromEmployee(employee)
    )
  }

  static createFromDeveloper(developer: Developer) {
    return new ProductOwner(
      [ScrumMemberRole.ProductOwner, developer.role],
      developer.member
    )
  }

  isDeveloper() {
    return this.roles.includes(ScrumMemberRole.Developer)
  }
}

export class ScrumMaster {
  constructor(
    public readonly roles: ScrumMemberRoleType[],
    public readonly member: Member
  ) {
    this.validate()
  }

  validate() {
    if (this.roles.includes(ScrumMemberRole.ProductOwner)) {
      throw new Error('ScrumMaster cannot be ProductOwner');
    }
  }

  static createFromEmployee(employee: Employee) {
    return new ScrumMaster(
      [ScrumMemberRole.ScrumMaster],
      Member.createFromEmployee(employee)
    )
  }

  static createFromDeveloper(developer: Developer) {
    return new ProductOwner(
      [ScrumMemberRole.ScrumMaster, developer.role],
      developer.member
    )
  }

  isDeveloper() {
    return this.roles.includes(ScrumMemberRole.Developer)
  }
}

export class Developer {
  public readonly role: ScrumMemberRoleType = ScrumMemberRole.Developer

  constructor(
    public readonly member: Member
  ) {}

  static createFromEmployee(employee: Employee) {
    return new Developer(Member.createFromEmployee(employee))
  }

  isDeveloper() {
    return true
  }
}
