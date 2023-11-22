import {DisbandScrumTeamCommand} from "@/use-case/scrum-team";
import {AutoIncrementId} from "@/common";

export class DisbandScrumTeamCliCommand implements DisbandScrumTeamCommand {
  constructor(
    private readonly scrumTeamId: string|number,
  ) {
  }

  getScrumTeamId(): AutoIncrementId {
    const id = typeof this.scrumTeamId === 'number' ?
      this.scrumTeamId : Number.parseInt(this.scrumTeamId, 10)
    return new AutoIncrementId(id)
  }
}
