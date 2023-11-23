import {CreateScrumTeamCommand, DisbandScrumTeamCommand, EditScrumTeamCommand} from "@/use-case/scrum-team";
import {AutoIncrementId} from "@/common";

export class CreateScrumTeamCliCommand implements CreateScrumTeamCommand {
  constructor(
    private readonly productOwnerId: number,
    private readonly scrumMasterId: number,
  ) {
  }

  getProductOwnerId(): AutoIncrementId {
    return new AutoIncrementId(this.productOwnerId)
  }

  getScrumMasterId(): AutoIncrementId {
    return new AutoIncrementId(this.scrumMasterId)
  }

  getDeveloperIds(): AutoIncrementId[] {
    // CLI の場合、チーム作成時に開発者は指定しない
    return []
  }
}

export class EditScrumTeamCliCommand implements EditScrumTeamCommand {
  constructor(
    private readonly productOwnerId: number,
    private readonly scrumMasterId: number,
    private readonly developerIds: number[],
  ) {
  }

  getProductOwnerId(): AutoIncrementId {
    return new AutoIncrementId(this.productOwnerId)
  }

  getScrumMasterId(): AutoIncrementId {
    return new AutoIncrementId(this.scrumMasterId)
  }

  getDeveloperIds(): AutoIncrementId[] {
    return this.developerIds.map((id) => new AutoIncrementId(id))
  }
}

export class DisbandScrumTeamCliCommand implements DisbandScrumTeamCommand {
  constructor(
    private readonly scrumTeamId: number,
  ) {
  }

  getScrumTeamId(): AutoIncrementId {
    return new AutoIncrementId(this.scrumTeamId)
  }
}
