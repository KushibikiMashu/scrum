import {Low} from "lowdb";
import {DataBase, db} from "@/cli/db";
import {ScrumTeam} from "@panda-project/core";
import {AutoIncrementId} from "@/common";

export class ScrumTeamRepository {
  constructor(private readonly lowdb: Low<DataBase> = db) {}

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
      product_owner_id: scrumTeam.productOwner.member.employee.id.value,
    })

    // scrum master を保存
    scrumMasters.push({
      scrum_team_id: scrumTeamAutoIncrementId.value,
      scrum_master_id: scrumTeam.scrumMaster.member.employee.id.value,
    })

    await this.lowdb.write()
  }
}
