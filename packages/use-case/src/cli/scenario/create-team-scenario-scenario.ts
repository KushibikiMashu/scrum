import {AutoIncrementId, Logger} from "@/common";
import {
  EmployeeRepositoryInterface, Member,
  ProductOwner, ScrumMaster,
  ScrumMemberRole,
  ScrumTeam, ScrumTeamRepositoryInterface
} from "@panda-project/core";
import {EmployeeRepository, ScrumTeamRepository} from "@/cli/repository";
import {FetchEmployeesUseCase} from "@/cli/scenario/use-case";

export type CreateTeamCallbackArg = Awaited<ReturnType<FetchEmployeesUseCase['exec']>>

export class CreateTeamScenarioScenario {
  constructor(
    private readonly validateUseCase: ValidateUseCase = new ValidateUseCase(),
    private readonly fetchEmployeesUseCase: FetchEmployeesUseCase = new FetchEmployeesUseCase(),
    private readonly createProductOwnerUseCase: CreateProductOwnerUseCase = new CreateProductOwnerUseCase(),
    private readonly createScrumMasterUseCase: CreateScrumMasterUseCase = new CreateScrumMasterUseCase(),
    private readonly createScrumTeamScenarioUseCase: CreateScrumTeamScenarioUseCase = new CreateScrumTeamScenarioUseCase(),
    private readonly logger: Logger = console,
  ) {
  }

  async exec(
    firstCallback: (arg: CreateTeamCallbackArg) => Promise<CreateTeamScenarioUserInputType>,
    secondCallback: (arg: CreateTeamCallbackArg) => Promise<CreateTeamScenarioUserInputType>,
  ): Promise<void> {
    try {
      await this.validateUseCase.exec()

      const employees = await this.fetchEmployeesUseCase.exec()
      const firstInput = await firstCallback(employees)
      const productOwner = await this.createProductOwnerUseCase.exec(new CreateTeamScenarioInput(firstInput))

      const employeesWithoutProductOwner = this.filterProductOwner(employees, productOwner)
      const secondInput = await secondCallback(employeesWithoutProductOwner)
      const scrumMaster = await this.createScrumMasterUseCase.exec(new CreateTeamScenarioInput(secondInput))

      await this.createScrumTeamScenarioUseCase.exec(productOwner, scrumMaster)
      this.logger.info(``);
    } catch (e: any) {
      this.logger.error(e?.message)
    }
  }

  private filterProductOwner(employees: CreateTeamCallbackArg, productOwner: ProductOwner) {
    return employees.filter(employee => employee.id !== productOwner.member.employee.id.value)
  }
}

type CreateTeamScenarioUserInputType = {
  employeeId: number
}

class CreateTeamScenarioInput {
  constructor(private readonly userInput: CreateTeamScenarioUserInputType) {}

  getEmployeeId() {
    return new AutoIncrementId(this.userInput.employeeId)
  }
}

class ValidateUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {
  }

  async exec() {
    const count = await this.employeeRepository.count()
    if (count < 2) {
      throw new Error('社員が2人以上登録されていません。employee-create コマンドで社員を追加してください')
    }
  }
}

class CreateProductOwnerUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {}

  async exec(input: CreateTeamScenarioInput) {
    const employee = await this.employeeRepository.findByIdOrFail(input.getEmployeeId())

    return new ProductOwner(
      [ScrumMemberRole.ProductOwner],
      Member.createFromEmployee(employee)
    )
  }
}

class CreateScrumMasterUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {}

  async exec(input: CreateTeamScenarioInput) {
    const employee = await this.employeeRepository.findByIdOrFail(input.getEmployeeId())

    return new ScrumMaster(
      [ScrumMemberRole.ScrumMaster],
      Member.createFromEmployee(employee)
    )
  }
}

class CreateScrumTeamScenarioUseCase {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
  ) {}

  async exec(productOwner: ProductOwner, scrumMaster: ScrumMaster) {
    const scrumTeam = ScrumTeam.createWithProductOwnerAndScrumMaster(productOwner, scrumMaster)
    return await this.scrumTeamRepository.save(scrumTeam)
  }
}
