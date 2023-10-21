import {ScrumTeamRepositoryInterface} from "@panda-project/core";
import {ScrumTeamRepository} from "@/gateway/repository";

export class ListScrumTeamScenario {
  constructor(
    private readonly validateUseCase: ValidateUseCase = new ValidateUseCase(),
    private readonly listScrumTeamUseCase: ListScrumTeamUseCase = new ListScrumTeamUseCase(),
    private readonly listScrumTeamPresenter: ListScrumTeamPresenter = new ListScrumTeamPresenter(),
  ) {}

  async exec(): Promise<string> {
    await this.validateUseCase.exec()
    const dto = await this.listScrumTeamUseCase.exec()
    return this.listScrumTeamPresenter.exec(dto)
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

type ListScrumTeamUseCaseDto = {
  poName: string;
  smName: string;
  developerNames: string[];
}

class ListScrumTeamUseCase {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
  ) {}

  async exec(): Promise<ListScrumTeamUseCaseDto> {
    const scrumTeam = await this.scrumTeamRepository.fetch()
    return {
      poName: scrumTeam.productOwner.member.employee.employeeName.getFullName(),
      smName: scrumTeam.scrumMaster.member.employee.employeeName.getFullName(),
      developerNames: scrumTeam.developers.map(developer => developer.member.employee.employeeName.getFullName()),
    }
  }
}

class ListScrumTeamPresenter {
  exec(dto: ListScrumTeamUseCaseDto) {
    const {poName, smName, developerNames} = dto
    const developerBody = developerNames.length === 0 ? '開発者はいません' : `開発者（${developerNames.length}名）: ${developerNames.join(', ')}`
    return `プロダクトオーナー: ${poName}
スクラムマスター: ${smName}
${developerBody}`
  }
}
