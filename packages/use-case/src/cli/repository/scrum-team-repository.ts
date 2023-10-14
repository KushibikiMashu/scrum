import {Low} from "lowdb";
import {
  DataBase,
  db,
  DevelopersSchema,
  EmployeesSchema,
  ProductOwnersSchema,
  ScrumMastersSchema,
  ScrumTeamsSchema
} from "@/cli/db";
import {
  Developer,
  Employee,
  EmployeeName, isDeveloper,
  ProductOwner,
  ScrumMaster,
  ScrumTeam
} from "@panda-project/core";
import {AutoIncrementId} from "@/common";

export class ScrumTeamRepository {
  constructor(private readonly lowdb: Low<DataBase> = db) {}

  async fetch() {
    await this.lowdb.read()
    const { scrumTeams, productOwners, scrumMasters, developers, employees } = this.lowdb.data
    if (scrumTeams.length === 0) {
      throw new Error('スクラムチームが作成されていません')
    }

    const scrumTeam = scrumTeams[0]

    return new ScrumTeam(
      new AutoIncrementId(scrumTeam.id),
      this.createProductOwner(scrumTeam, productOwners, employees, developers),
      this.createScrumMaster(scrumTeam, scrumMasters, employees, developers),
      this.createDevelopers(scrumTeam, developers, employees),
      [],
      [],
    )
  }

  // まだ ProductOwnerRepository としては切り出さない
  private createProductOwner(scrumTeam: ScrumTeamsSchema[number], productOwners: ProductOwnersSchema, employees: EmployeesSchema, developers: DevelopersSchema): ProductOwner {
    const productOwner = productOwners.find(po => po.scrum_team_id === scrumTeam.id)
    if (!productOwner) {
      throw new Error('プロダクトオーナーが設定されていません')
    }
    const productOwnerEmployee = employees.find(employee => employee.id === productOwner.employee_id)!

    const employee = new Employee(
      new AutoIncrementId(productOwnerEmployee.id),
      new EmployeeName(productOwnerEmployee.first_name, productOwnerEmployee.family_name)
    )
    const isDeveloper = developers.some(developer => developer.employee_id === productOwnerEmployee.id)

    return isDeveloper ?
      ProductOwner.createFromDeveloper(Developer.createFromEmployee(employee))
      : ProductOwner.createFromEmployee(employee)
  }

  // まだ ScrumMasterRepository としては切り出さない
  private createScrumMaster(scrumTeam: ScrumTeamsSchema[number], scrumMasters: ScrumMastersSchema, employees: EmployeesSchema, developers: DevelopersSchema): ScrumMaster {
    const scrumMaster = scrumMasters.find(sm => sm.scrum_team_id === scrumTeam.id)!
    if (!scrumMaster) {
      throw new Error('スクラムマスターが設定されていません')
    }
    const scrumMasterEmployee = employees.find(employee => employee.id === scrumMaster.employee_id)!

    const employee = new Employee(
      new AutoIncrementId(scrumMasterEmployee.id),
      new EmployeeName(scrumMasterEmployee.first_name, scrumMasterEmployee.family_name)
    )
    const isDeveloper = developers.some(developer => developer.employee_id === scrumMasterEmployee.id)

    return isDeveloper ?
      ScrumMaster.createFromDeveloper(Developer.createFromEmployee(employee))
      : ScrumMaster.createFromEmployee(employee)
  }

  private createDevelopers(scrumTeam: ScrumTeamsSchema[number], developers: DevelopersSchema, employees: EmployeesSchema): Developer[] {
    const developerRecords = developers.filter(developer => developer.scrum_team_id === scrumTeam.id)

    return developerRecords.map((developerRecord) => {
      const employee = employees.find(employee => employee.id === developerRecord.employee_id)!
      return Developer.createFromEmployee(
        new Employee(
          new AutoIncrementId(employee.id),
          new EmployeeName(employee.first_name, employee.family_name)),
      )
    })
  }

  async exists() {
    await this.lowdb.read()
    const { scrumTeams } = this.lowdb.data
    return scrumTeams.length > 0
  }

  async save(scrumTeam: ScrumTeam) {
    await this.lowdb.read()
    const { scrumTeams, productOwners, scrumMasters, developers } = this.lowdb.data

    // scrum team を保存
    const scrumTeamAutoIncrementId = AutoIncrementId.createFromRecords(scrumTeams)
    scrumTeams.push({
      id: scrumTeamAutoIncrementId.value,
      product_backlog_id: null,
    })

    // product owner を保存
    productOwners.push({
      scrum_team_id: scrumTeamAutoIncrementId.value,
      employee_id: scrumTeam.productOwner.member.employee.id.value!,
    })

    // scrum master を保存
    scrumMasters.push({
      scrum_team_id: scrumTeamAutoIncrementId.value,
      employee_id: scrumTeam.scrumMaster.member.employee.id.value!,
    })

    // developer を保存
    for (const scrumTeamDeveloper of scrumTeam.developers) {
      developers.push({
        id: AutoIncrementId.createFromRecords(developers).value,
        scrum_team_id: scrumTeam.id.value!,
        employee_id: scrumTeamDeveloper.member.employee.id.value!,
      })
    }

    await this.lowdb.write()
  }

  async update(scrumTeam: ScrumTeam) {
    await this.lowdb.read()
    const { productOwners, scrumMasters, developers } = this.lowdb.data
    const {productOwner, scrumMaster} = scrumTeam

    // product owner を更新
    const productOwnerIndex = productOwners.findIndex(po => po.scrum_team_id === scrumTeam.id.value)
    productOwners[productOwnerIndex] = {
      scrum_team_id: scrumTeam.id.value!,
      employee_id: productOwner.member.employee.id.value!,
    }

    // scrum master を更新
    const scrumMasterIndex = scrumMasters.findIndex(sm => sm.scrum_team_id === scrumTeam.id.value)
    scrumMasters[scrumMasterIndex] = {
      scrum_team_id: scrumTeam.id.value!,
      employee_id: scrumMaster.member.employee.id.value!,
    }

    // developer を更新
    // db         [1,2,3,4]
    // scrum team   [2,3,4,5]
    // result       [2,3,4,5]
    // スクラムチームのIDで開発者を全て削除したあと、スクラムチームの開発者を insert するようにする

    // スクラムチームのIDが同じ開発者をDBから削除
    const developerRecordIds = developers
      .filter((developer) => developer.scrum_team_id === scrumTeam.id.value)
      .map((developer) => developer.id)
    for (const developerRecordId of developerRecordIds) {
      const developerIndex = developers.findIndex((developer) => developer.id === developerRecordId)
      developers.splice(developerIndex, 1)
    }

    // スクラムチームの開発者をDBに追加
    for (const scrumTeamDeveloper of scrumTeam.developers) {
        developers.push({
          id: AutoIncrementId.createFromRecords(developers).value,
          scrum_team_id: scrumTeam.id.value!,
          employee_id: scrumTeamDeveloper.member.employee.id.value!,
        })
    }

    await this.lowdb.write()
  }

  async delete() {
    await this.lowdb.read()

    // CLI からは1チームしか作れないのでこれで良い
    this.lowdb.data.scrumTeams = []
    this.lowdb.data.productOwners = []
    this.lowdb.data.scrumMasters = []
    this.lowdb.data.developers = []

    await this.lowdb.write()
  }
}
