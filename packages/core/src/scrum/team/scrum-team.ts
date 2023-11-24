import { Id } from '@/common'
import { Employee, EmployeeId, Member } from '@/company'

export const ScrumMemberRole = {
  ProductOwner: 'product_owner',
  ScrumMaster: 'scrum_master',
  Developer: 'developer',
} as const

export type ScrumMemberRoleType = (typeof ScrumMemberRole)[keyof typeof ScrumMemberRole]

export class ScrumTeamId extends Id {
  constructor(public readonly value: number | null) {
    super(value)
  }

  static createAsNull() {
    return new ScrumTeamId(null)
  }

  equals(id: ScrumTeamId) {
    return this.value === id.value
  }
}

export class ScrumTeam {
  constructor(
    public readonly id: ScrumTeamId,
    public readonly productOwner: ProductOwner,
    public readonly scrumMaster: ScrumMaster,
    public readonly developers: Developer[]
  ) {}

  static createWithProductOwnerAndScrumMaster(productOwner: ProductOwner, scrumMaster: ScrumMaster) {
    return new ScrumTeam(ScrumTeamId.createAsNull(), productOwner, scrumMaster, [])
  }

  static createNew(productOwner: ProductOwner, scrumMaster: ScrumMaster, developers: Developer[]) {
    return new ScrumTeam(ScrumTeamId.createAsNull(), productOwner, scrumMaster, developers)
  }

  changeProductOwner(productOwner: ProductOwner) {
    return new ScrumTeam(this.id, productOwner, this.scrumMaster, this.developers)
  }

  changeScrumMaster(scrumMaster: ScrumMaster) {
    return new ScrumTeam(this.id, this.productOwner, scrumMaster, this.developers)
  }

  getDeveloperByEmployeeId(employeeId: EmployeeId): Developer {
    const developer = this.developers.find((developer) => developer.getEmployeeId().equals(employeeId))
    if (!developer) {
      throw new Error(`開発者がスクラムチームに参加していません。ID: ${employeeId.toInt()}`)
    }
    return developer
  }

  addDeveloper(developer: Developer) {
    return new ScrumTeam(this.id, this.productOwner, this.scrumMaster, [...this.developers, developer])
  }

  updateDevelopers(developers: Developer[]) {
    return new ScrumTeam(this.id, this.productOwner, this.scrumMaster, developers)
  }

  removeDeveloper(developer: Developer) {
    const newDevelopers = this.developers.filter((v) => v !== developer)
    return new ScrumTeam(this.id, this.productOwner, this.scrumMaster, newDevelopers)
  }

  countScrumMembers(): number {
    return this.developers.length + 2
  }

  isBelongTo(employeeId: EmployeeId): boolean {
    return (
      this.productOwner.member.employee.id.equals(employeeId) ||
      this.scrumMaster.member.employee.id.equals(employeeId) ||
      this.developers.some((developer) => developer.getEmployeeId().equals(employeeId))
    )
  }

  isScrumTeamDeveloper(employeeId: EmployeeId): boolean {
    return this.developers.some((developer) => developer.getEmployeeId().equals(employeeId))
  }

  getProductOwnerId(): EmployeeId {
    return this.productOwner.getEmployeeId()
  }

  getScrumMasterId(): EmployeeId {
    return this.scrumMaster.getEmployeeId()
  }

  getDeveloperIds(): EmployeeId[] {
    return this.developers.map((developer) => developer.getEmployeeId())
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

  private validate() {
    if (this.roles.includes(ScrumMemberRole.ScrumMaster)) {
      throw new Error('ProductOwner cannot be ScrumMaster')
    }
    if (!this.roles.includes(ScrumMemberRole.ProductOwner)) {
      throw new Error('ProductOwner must have ProductOwnerRole')
    }
  }

  static createFromEmployee(employee: Employee) {
    return new ProductOwner([ScrumMemberRole.ProductOwner], Member.createFromEmployee(employee))
  }

  static createFromDeveloper(developer: Developer) {
    return new ProductOwner([ScrumMemberRole.ProductOwner, developer.role], developer.member)
  }

  getEmployeeId(): EmployeeId {
    return this.member.employee.id
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

  private validate() {
    if (this.roles.includes(ScrumMemberRole.ProductOwner)) {
      throw new Error('ScrumMaster cannot be ProductOwner')
    }
    if (!this.roles.includes(ScrumMemberRole.ScrumMaster)) {
      throw new Error('ScrumMaster must have ScrumMasterRole')
    }
  }

  static createFromEmployee(employee: Employee) {
    return new ScrumMaster([ScrumMemberRole.ScrumMaster], Member.createFromEmployee(employee))
  }

  static createFromDeveloper(developer: Developer) {
    return new ScrumMaster([ScrumMemberRole.ScrumMaster, developer.role], developer.member)
  }

  getEmployeeId(): EmployeeId {
    return this.member.employee.id
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

  constructor(public readonly member: Member) {}

  static createFromEmployee(employee: Employee) {
    return new Developer(Member.createFromEmployee(employee))
  }

  getEmployeeId(): EmployeeId {
    return this.member.employee.id
  }

  getFullName(): string {
    return this.member.employee.employeeName.getFullName()
  }

  isDeveloper() {
    return true
  }
}
