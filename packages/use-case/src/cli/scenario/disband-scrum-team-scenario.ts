import {Logger} from "@/common";
import {ScrumTeamRepositoryInterface} from "@panda-project/core";
import {ScrumTeamRepository} from "@/cli/repository";

export class DisbandScrumTeamScenario {
  constructor(
    private readonly validateUseCase: ValidateUseCase = new ValidateUseCase(),
    private readonly disbandScrumTeamUseCase: DisbandScrumTeamUseCase = new DisbandScrumTeamUseCase(),
    private readonly logger: Logger = console,
  ) {
  }

  async exec(): Promise<void> {
    try {
      await this.validateUseCase.exec()
      await this.disbandScrumTeamUseCase.exec()
    } catch (e: any) {
      this.logger.error(e?.message)
    }
  }
}

class ValidateUseCase {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
  ) {}

  async exec() {
    const exists = await this.scrumTeamRepository.exists()
    if (!exists) {
      throw new Error('スクラムチームが作成されていません')
    }
  }
}

class DisbandScrumTeamUseCase {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
  ) {
  }

  async exec() {
    await this.scrumTeamRepository.delete()
  }
}
