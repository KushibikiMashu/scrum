import {
  AddDeveloperCommand,
  CreateScrumTeamCommand,
  DisbandScrumTeamCommand,
  EditScrumTeamCommand
} from "@/use-case/scrum-team";
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
    // 重複の有無をチェック。ID の重複を排除するために Set を使う
    const uniqueIds = new Set(this.developerIds)
    if (uniqueIds.size !== this.developerIds.length) {
      throw new Error('開発者が重複しています')
    }

    return this.developerIds.map((id) => new AutoIncrementId(id))
  }
}

export class AddDeveloperCliCommand implements AddDeveloperCommand {
  constructor(
    private readonly developerId: number,
  ) {
  }

  getDeveloperId(): AutoIncrementId {
    return new AutoIncrementId(this.developerId)
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
