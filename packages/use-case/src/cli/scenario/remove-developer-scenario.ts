import {Logger} from "@/common";
import {EmployeeRepositoryInterface, ScrumTeam, ScrumTeamRepositoryInterface} from "@panda-project/core";
import {EmployeeRepository, ScrumTeamRepository} from "@/cli/repository";

export type RemoveDeveloperCallbackArg = {id: number, name: string}

export class RemoveDeveloperScenario {
  constructor(
    private readonly validateUseCase: ValidateUseCase = new ValidateUseCase(),
    private readonly removeDeveloperUseCase: RemoveDeveloperUseCase = new RemoveDeveloperUseCase(),
    private readonly logger: Logger = console,
  ) {
  }

  async exec(callback: (arg: RemoveDeveloperCallbackArg) => Promise<RemoveDeveloperUserInputType>): Promise<void> {
    try {
      await this.validateUseCase.exec()
      const input = await callback()
      await this.removeDeveloperUseCase.exec(new RemoveDeveloperInput(input))
      this.logger.info(``);
    } catch (e: any) {
      this.logger.error(e?.message)
    }
  }
}

type RemoveDeveloperUserInputType = {

}

class RemoveDeveloperInput {
  constructor(private readonly userInput: RemoveDeveloperUserInputType) {}


}

class FetchAllScrumTeamDevelopersUseCase {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
  ) {}


}

class ValidateUseCase {
  constructor(
    private readonly
  ) {
  }

  async exec() {

  }
}

class RemoveDeveloperUseCase {
  constructor(
    private readonly
  ) {
  }

  async exec(input: RemoveDeveloperInput) {

  }
}
