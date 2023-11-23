import {AutoIncrementId} from "@/common";
import {EditScrumTeamCommand, CreateScrumTeamCommand, DisbandScrumTeamCommand} from "@/use-case/scrum-team";

export class CreateScrumTeamWebCommand implements CreateScrumTeamCommand {
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
    // 重複の有無をチェック。ID の重複を排除するために Set を使う
    const uniqueIds = new Set(this.developerIds)
    if (uniqueIds.size !== this.developerIds.length) {
      throw new Error('開発者が重複しています')
    }

    return this.developerIds.filter(id => id !== '')
      .map(id => new AutoIncrementId(Number.parseInt(id, 10)))
  }
}

export class EditScrumTeamWebCommand implements EditScrumTeamCommand {
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
    // 重複の有無をチェック。ID の重複を排除するために Set を使う
    const uniqueIds = new Set(this.developerIds)
    if (uniqueIds.size !== this.developerIds.length) {
      throw new Error('開発者が重複しています')
    }

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
