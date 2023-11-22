import {AutoIncrementId} from "@/common";
import {CreateOrUpdateScrumTeamCommand, DisbandScrumTeamCommand} from "@/use-case/scrum-team";

export class CreateOrUpdateScrumTeamWebCommand implements CreateOrUpdateScrumTeamCommand {
  constructor(
    private readonly productOwnerId: string,
    private readonly scrumMasterId: string,
    private readonly developerIds: string[],
  ) {
  }

  getProductOwnerId(): AutoIncrementId {
    return new AutoIncrementId(Number.parseInt(this.productOwnerId, 10))
  }

  getScrumMasterId(): AutoIncrementId {
    return new AutoIncrementId(Number.parseInt(this.scrumMasterId, 10))
  }

  getDeveloperIds(): AutoIncrementId[] {
    return this.developerIds.filter(id => id !== '')
      .map(id => new AutoIncrementId(Number.parseInt(id, 10)))
  }
}

export class DisbandScrumTeamWebCommand implements DisbandScrumTeamCommand {
  constructor(
    private readonly scrumTeamId: string,
  ) {
  }

  getScrumTeamId(): AutoIncrementId {
    return new AutoIncrementId(Number.parseInt(this.scrumTeamId, 10))
  }
}

