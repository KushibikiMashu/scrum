import {Employee, EmployeeName, EmployeeRepositoryInterface, ID} from "@panda-project/core";
import {EmployeeRepository} from "@/cli/repository";
import {Logger} from "@/common";

export class EmployeeCreateScenario {
  constructor(
    private readonly validateUseCase: ValidateUseCase = new ValidateUseCase(),
    private readonly createEmployeeUseCase: CreateEmployeeUseCase = new CreateEmployeeUseCase(),
    private readonly logger: Logger = console,
  ) {
  }

  async exec(callback: () => Promise<EmployeeCreateUserInputType>): Promise<void> {
    try {
      await this.validateUseCase.exec()
    } catch (e: any) {
      this.logger.error(e?.message)
      return
    }

    const input = await callback()

    try {
      await this.createEmployeeUseCase.exec(new EmployeeCreateInput(input.employee))
      this.logger.info(`社員を登録しました: ${input.employee}`);
    } catch (e: any) {
      this.logger.error(e?.message)
    }
  }
}

type EmployeeCreateUserInputType = {
  employee: string
}

class EmployeeCreateInput {
  constructor(public readonly employeeName: string) {}

  getEmployeeName() {
    return EmployeeName.createFromString(this.employeeName)
  }
}

class ValidateUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {
  }

  async exec() {
    const count = await this.employeeRepository.count()
    if (count > 50) {
      throw new Error('登録できる従業員数の上限に達しました。登録可能な人数は50名以下です')
    }
  }
}

class CreateEmployeeUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {
  }

  async exec(input: EmployeeCreateInput) {
    const employee = new Employee(
      ID.createAsNull(),
      input.getEmployeeName()
    )
    await this.employeeRepository.save(employee)
  }
}
