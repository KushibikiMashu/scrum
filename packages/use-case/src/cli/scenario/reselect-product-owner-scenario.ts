import {AutoIncrementId, Logger} from "@/common";
import {EmployeeRepository, ScrumTeamRepository} from "@/cli/repository";
import {
  Developer,
  EmployeeRepositoryInterface,
  ProductOwner,
  ScrumTeam,
  ScrumTeamRepositoryInterface
} from "@panda-project/core";

export type ReselectProductOwnerCallbackArg = Awaited<ReturnType<FetchEmployeesWithoutPoAndSmUseCase['exec']>>

export class ReselectProductOwnerScenario {
  constructor(
    private readonly validateUseCase: ValidateUseCase = new ValidateUseCase(),
    private readonly fetchEmployeesWithoutPoAndSmUseCase: FetchEmployeesWithoutPoAndSmUseCase = new FetchEmployeesWithoutPoAndSmUseCase(),
    private readonly reselectProductOwnerUseCase: ReselectProductOwnerUseCase = new ReselectProductOwnerUseCase(),
    private readonly logger: Logger = console,
  ) {}

  async exec(callback: (arg: ReselectProductOwnerCallbackArg) => Promise<ReselectProductOwnerUserInputType>): Promise<void> {
    try {
      await this.validateUseCase.exec()
      const employees = await this.fetchEmployeesWithoutPoAndSmUseCase.exec()
      const input = await callback(employees)
      await this.reselectProductOwnerUseCase.exec(new ReselectProductOwnerInput(input))
      this.logger.info(``);
    } catch (e: any) {
      this.logger.error(e?.message)
    }
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

class FetchEmployeesWithoutPoAndSmUseCase {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {
  }

  async exec(): Promise<{id: number; name: string}[]> {
    const employees = await this.employeeRepository.findAll()
    const scrumTeam = await this.scrumTeamRepository.fetch()
    return employees.filter(employee => {
      const isPo = scrumTeam.productOwner.member.employee.id.value === employee.id.value
      const isSm = scrumTeam.scrumMaster.member.employee.id.value === employee.id.value
      return !isPo && !isSm
    }).map(employee => ({
      id: employee.id.value!,
      name: employee.employeeName.getFullName(),
    }))
  }
}

class ReselectProductOwnerUseCase {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {
  }

  async exec(input: ReselectProductOwnerInput) {
    const employee = await this.employeeRepository.findByIdOrFail(input.getEmployeeId())
    // 開発者がプロダクトオーナーになることもあり得る
    const scrumTeam = await this.scrumTeamRepository.fetch()

    const scrumMember = scrumTeam.getScrumMemberByEmployeeId(employee.id)
    const newProductOwner = this.isDeveloper(scrumMember) ?
      ProductOwner.createFromDeveloper(scrumMember)
      : ProductOwner.createFromEmployee(employee)

    scrumTeam.changeProductOwner(newProductOwner)

    // 保存する
    await this.scrumTeamRepository.update(scrumTeam)
  }

  private isDeveloper(scrumMember: ReturnType<ScrumTeam['getScrumMemberByEmployeeId']>): scrumMember is Developer {
    return scrumMember?.isDeveloper() ?? false
  }
}
