import {Low} from "lowdb";
import {DataBase, db} from "@/cli/db";
import {
  Employee,
  EmployeeName,
  Member,
  Product,
  ProductOwner,
  ScrumMaster,
  ScrumMemberRole,
  ScrumTeam
} from "@panda-project/core";
import {AutoIncrementId} from "@/common";

export class ScrumTeamRepository {
  constructor(private readonly lowdb: Low<DataBase> = db) {}

  async fetch() {
    await this.lowdb.read()
    const { scrumTeams, productOwners, scrumMasters, employees } = this.lowdb.data

    if (scrumTeams.length === 0) {
      throw new Error('スクラムチームが作成されていません')
    }

    const scrumTeam = scrumTeams[0]
    const productOwner = productOwners.find(po => po.scrum_team_id === scrumTeam.id)!
    const productOwnerEmployee = employees.find(employee => employee.id === productOwner.employee_id)!

    const scrumMaster = scrumMasters.find(sm => sm.scrum_team_id === scrumTeam.id)!
    const scrumMasterEmployee = employees.find(employee => employee.id === scrumMaster.employee_id)!

    return new ScrumTeam(
      new AutoIncrementId(scrumTeam.id),
      ProductOwner.createFromEmployee( // TODO: 開発者が兼任することもある
        new Employee(
          new AutoIncrementId(productOwnerEmployee.id),
          new EmployeeName(productOwnerEmployee.first_name, productOwnerEmployee.family_name)
        )
      ),
      ScrumMaster.createFromEmployee( // TODO: 開発者が兼任することもある
        new Employee(
          new AutoIncrementId(scrumMasterEmployee.id),
          new EmployeeName(scrumMasterEmployee.first_name, scrumMasterEmployee.family_name)
        )
      ),
      [],
      [],
      [],
    )
  }

  async exists() {
    await this.lowdb.read()
    const { scrumTeams } = this.lowdb.data
    return scrumTeams.length > 0
  }

  async save(scrumTeam: ScrumTeam) {
    await this.lowdb.read()
    const { scrumTeams, productOwners, scrumMasters } = this.lowdb.data

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

    await this.lowdb.write()
  }

  async update(scrumTeam: ScrumTeam) {
    // TODO implement
  }
}
