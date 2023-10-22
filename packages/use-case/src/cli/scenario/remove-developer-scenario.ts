import {ScrumTeamRepositoryInterface} from "@panda-project/core";
import {ScrumTeamRepository} from "@/gateway/repository";

export type RemoveDeveloperCallback = (arg: Awaited<ReturnType<FetchAllScrumTeamDevelopersUseCase['exec']>>) => Promise<RemoveDeveloperUserInputType>

export class RemoveDeveloperScenario {
  constructor(
    private readonly fetchAllScrumTeamDevelopersUseCase: FetchAllScrumTeamDevelopersUseCase = new FetchAllScrumTeamDevelopersUseCase(),
    private readonly validateUseCase: ValidateUseCase = new ValidateUseCase(),
    private readonly removeDeveloperUseCase: RemoveDeveloperUseCase = new RemoveDeveloperUseCase(),
  ) {}

  async exec(
    callback: RemoveDeveloperCallback,
    secondCallback: () => Promise<boolean>,
  ): Promise<string|undefined> {
    await this.validateUseCase.exec()
    const allDevelopers = await this.fetchAllScrumTeamDevelopersUseCase.exec()

    for (let i = allDevelopers.length; allDevelopers.length > 0; i--) {
      const options = await this.fetchAllScrumTeamDevelopersUseCase.exec()
      const input = await callback(options)
      await this.removeDeveloperUseCase.exec(new RemoveDeveloperInput(input))

      if (i > 1) {
        const shouldSelectMore = await secondCallback()
        if (!shouldSelectMore) {
          return
        }
      } else if (i === 1) {
        return 'スクラムチームから除外できる社員はいません'
      }
    }
  }
}

type RemoveDeveloperUserInputType = {
  developerIndex: number
}

class RemoveDeveloperInput {
  constructor(private readonly userInput: RemoveDeveloperUserInputType) {
  }

  getDeveloperIndex(): number {
    if (this.userInput.developerIndex < 0) {
      throw new Error('開発者の index が不正です')
    }

    return this.userInput.developerIndex
  }
}

class FetchAllScrumTeamDevelopersUseCase {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
  ) {
  }

  async exec(): Promise<{ index: number; name: string }[]> {
    const scrumTeam = await this.scrumTeamRepository.fetchOrFail()
    return scrumTeam.developers.map((developer, i) => {
      return {
        index: i,
        name: developer.member.employee.employeeName.getFullName(),
      }
    })
  }
}

class ValidateUseCase {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
  ) {
  }

  async exec() {
    const exists = await this.scrumTeamRepository.exists()
    if (!exists) {
      throw new Error('スクラムチームが作成されていません')
    }
    const scrumTeam = await this.scrumTeamRepository.fetchOrFail()
    if (scrumTeam.developers.length === 0) {
      throw new Error('スクラムチームに開発者がいません')
    }
  }
}

class RemoveDeveloperUseCase {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
  ) {
  }

  async exec(input: RemoveDeveloperInput) {
    const targetIndex = input.getDeveloperIndex()
    const scrumTeam = await this.scrumTeamRepository.fetchOrFail()

    if (targetIndex > scrumTeam.developers.length) {
      throw new Error('開発者の index が不正です')
    }

    const target = scrumTeam.developers[targetIndex]
    const newScrumTeam = scrumTeam.removeDeveloper(target)

    await this.scrumTeamRepository.update(newScrumTeam)
  }
}
