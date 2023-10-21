import {AutoIncrementId} from "@/common";
import {EmployeeRepository, ScrumTeamRepository} from "@/gateway/repository";
import {
  EmployeeRepositoryInterface, isDeveloper,
  ProductOwner,
  ScrumTeamRepositoryInterface
} from "@panda-project/core";
import {FetchAllEmployeesWithoutPoAndSmUseCase} from "@/cli/scenario/use-case";

export type ReselectProductOwnerCallbackArg = (arg: Awaited<ReturnType<FetchAllEmployeesWithoutPoAndSmUseCase['exec']>>)  => Promise<ReselectProductOwnerUserInputType>

export class ReselectProductOwnerScenario {
  constructor(
    private readonly validateUseCase: ValidateUseCase = new ValidateUseCase(),
    private readonly fetchAllEmployeesWithoutPoAndSmUseCase: FetchAllEmployeesWithoutPoAndSmUseCase = new FetchAllEmployeesWithoutPoAndSmUseCase(),
    private readonly reselectProductOwnerUseCase: ReselectProductOwnerUseCase = new ReselectProductOwnerUseCase(),
  ) {}

  async exec(callback: ReselectProductOwnerCallbackArg): Promise<void> {
    await this.validateUseCase.exec()
    const employees = await this.fetchAllEmployeesWithoutPoAndSmUseCase.exec()
    const input = await callback(employees)
    await this.reselectProductOwnerUseCase.exec(new ReselectProductOwnerInput(input))
  }
}

type ReselectProductOwnerUserInputType = {
  employeeId: number
}

class ReselectProductOwnerInput {
  constructor(private readonly userInput: ReselectProductOwnerUserInputType) {}

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
      throw new Error('社員が2人以下なのでプロダクトオーナーを再選定できません')
    }
  }
}

class ReselectProductOwnerUseCase {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {}

  async exec(input: ReselectProductOwnerInput) {
    const employee = await this.employeeRepository.findByIdOrFail(input.getEmployeeId())
    // 開発者がプロダクトオーナーになることもあり得る
    const scrumTeam = await this.scrumTeamRepository.fetch()

    const scrumMember = scrumTeam.getScrumMemberByEmployeeId(employee.id)
    const newProductOwner = isDeveloper(scrumMember) ?
      ProductOwner.createFromDeveloper(scrumMember)
      : ProductOwner.createFromEmployee(employee)
    const newScrumTeam = scrumTeam.changeProductOwner(newProductOwner)

    await this.scrumTeamRepository.update(newScrumTeam)
  }
}
