import {Employee, Member} from "@/company";
import {Increment, ProductGoal} from "@/scrum";
import {ID} from "@/common";

export class InvalidProjectNameError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export class ProjectName {
  constructor(
    public readonly value: string
  ) {
    this.validate()
  }

  equals(other: ProjectName): boolean {
    return this.value === other.value
  }

  private validate() {
    if (this.value.length < 1) {
      throw new InvalidProjectNameError('1文字以上入力してください')
    }
  }
}

export class Project {
  constructor(
    public readonly id: ID,
    public readonly name: ProjectName,

    // 必要かはわからないのでコメントアウトしておく
    // public readonly product: Product,
    // public readonly team: ScrumTeam,
    // public readonly sprints: Sprint[],
  ) {
  }

  // pickCurrentSprint(): Sprint
}

export interface ProjectRepositoryInterface {
  fetch(): Promise<Project|null>
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
  ) {}

  static createWithProductOwnerAndScrumMaster(productOwner: ProductOwner, scrumMaster: ScrumMaster) {
    return new ScrumTeam(ID.createAsNull(), productOwner, scrumMaster, [])
  }

  static createFromNewScrumTeam(productOwner: ProductOwner, scrumMaster: ScrumMaster, developers: Developer[]) {
    return new ScrumTeam(ID.createAsNull(), productOwner, scrumMaster, developers)
  }

  changeProductOwner(productOwner: ProductOwner) {
    return new ScrumTeam(this.id, productOwner, this.scrumMaster, this.developers)
  }

  changeScrumMaster(scrumMaster: ScrumMaster) {
    return new ScrumTeam(this.id, this.productOwner, scrumMaster, this.developers)
  }

  getScrumMemberByEmployeeId(employeeId: ID): ProductOwner | ScrumMaster | Developer | null {
    if (this.productOwner.member.employee.id.equals(employeeId)) return this.productOwner
    if (this.scrumMaster.member.employee.id.equals(employeeId)) return this.scrumMaster
    const developer = this.developers.find(developer => developer.member.employee.id.equals(employeeId))
    return developer ?? null
  }

  addDeveloper(developer: Developer) {
    return new ScrumTeam(this.id, this.productOwner, this.scrumMaster, [...this.developers, developer])
  }

  updateDevelopers(developers: Developer[]) {
    return new ScrumTeam(this.id, this.productOwner, this.scrumMaster, developers)
  }

  removeDeveloper(developer: Developer) {
    const newDevelopers = this.developers.filter(v => v !== developer)
    return new ScrumTeam(this.id, this.productOwner, this.scrumMaster, newDevelopers)
  }

  countScrumMembers(): number {
    return this.developers.length + 2
  }

  isBelongTo(employeeId: ID): boolean {
    return this.productOwner.member.employee.id.equals(employeeId)
      || this.scrumMaster.member.employee.id.equals(employeeId)
      || this.developers.some(developer => developer.member.employee.id.equals(employeeId))
  }
}

export interface ScrumTeamRepositoryInterface {
  fetchOrFail(): Promise<ScrumTeam>
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

  getId(): number {
    return this.member.employee.id.value!
  }

  getFullName(): string {
    return this.member.employee.employeeName.getFullName()
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
    return new ScrumMaster(
      [ScrumMemberRole.ScrumMaster, developer.role],
      developer.member
    )
  }

  getId(): number {
    return this.member.employee.id.value!
  }

  getFullName(): string {
    return this.member.employee.employeeName.getFullName()
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

  getId(): number {
    return this.member.employee.id.value!
  }

  getFullName(): string {
    return this.member.employee.employeeName.getFullName()
  }

  isDeveloper() {
    return true
  }
}
