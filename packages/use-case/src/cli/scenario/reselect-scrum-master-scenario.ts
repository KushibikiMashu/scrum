import {AutoIncrementId, Logger} from "@/common";
import {FetchAllEmployeesWithoutPoAndSmUseCase} from "@/cli/scenario/use-case";
import {
  EmployeeRepositoryInterface,
  isDeveloper,
  ProductOwner, ScrumMaster,
  ScrumTeamRepositoryInterface
} from "@panda-project/core";
import {EmployeeRepository, ScrumTeamRepository} from "@/cli/repository";

export type ReselectScrumMasterCallbackArg = Awaited<ReturnType<FetchAllEmployeesWithoutPoAndSmUseCase['exec']>>

export class ReselectScrumMasterScenario {
  constructor(
    private readonly validateUseCase: ValidateUseCase = new ValidateUseCase(),
    private readonly fetchAllEmployeesWithoutPoAndSmUseCase: FetchAllEmployeesWithoutPoAndSmUseCase = new FetchAllEmployeesWithoutPoAndSmUseCase(),
    private readonly reselectScrumMasterUseCase: ReselectScrumMasterUseCase = new ReselectScrumMasterUseCase(),
    private readonly logger: Logger = console,
  ) {
  }

  async exec(callback: (arg: ReselectScrumMasterCallbackArg) => Promise<ReselectScrumMasterUserInputType>): Promise<void> {
    try {
      await this.validateUseCase.exec()
      const employees = await this.fetchAllEmployeesWithoutPoAndSmUseCase.exec()
      const input = await callback(employees)
      await this.reselectScrumMasterUseCase.exec(new ReselectScrumMasterInput(input))
    } catch (e: any) {
      this.logger.error(e?.message)
    }
  }
}

type ReselectScrumMasterUserInputType = {
  employeeId: number
}

class ReselectScrumMasterInput {
  constructor(private readonly userInput: ReselectScrumMasterUserInputType) {}

  getEmployeeId() {
    return new AutoIncrementId(this.userInput.employeeId)
  }
}

class ValidateUseCase {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {}

  async exec() {
    // スクラムチームがない場合はエラーになる
    const exists = await this.scrumTeamRepository.exists()
    if (!exists) {
      throw new Error('スクラムチームが作成されていません')
    }

    // 社員が2人以下の場合はエラーになる
    const count = await this.employeeRepository.count()
    if (count <= 2) {
      throw new Error('社員が2人以下なのでスクラムマスターを再選定できません')
    }
  }
}

class ReselectScrumMasterUseCase {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {
  }

  async exec(input: ReselectScrumMasterInput) {
    const employee = await this.employeeRepository.findByIdOrFail(input.getEmployeeId())
    // 開発者がスクラムマスターになることもあり得る
    const scrumTeam = await this.scrumTeamRepository.fetch()

    const scrumMember = scrumTeam.getScrumMemberByEmployeeId(employee.id)
    const newScrumMaster = isDeveloper(scrumMember) ?
      ScrumMaster.createFromDeveloper(scrumMember)
      : ScrumMaster.createFromEmployee(employee)
    const newScrumTeam = scrumTeam.changeScrumMaster(newScrumMaster)

    await this.scrumTeamRepository.update(newScrumTeam)
  }
}
