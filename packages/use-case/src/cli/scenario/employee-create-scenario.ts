import {Employee, EmployeeName, EmployeeRepositoryInterface, ID} from "@panda-project/core";
import {EmployeeRepository} from "@/gateway/repository/db";

export class EmployeeCreateScenario {
  constructor(
    private readonly validateUseCase: ValidateUseCase = new ValidateUseCase(),
    private readonly createEmployeeUseCase: CreateEmployeeUseCase = new CreateEmployeeUseCase(),
    private readonly employeeCreatePresenter: EmployeeCreatePresenter = new EmployeeCreatePresenter(),
  ) {
  }

  async exec(callback: () => Promise<EmployeeCreateUserInputType>): Promise<string> {
    const userInput = await callback()

    await this.validateUseCase.exec()
    const input = new EmployeeCreateInput(userInput.employee)
    await this.createEmployeeUseCase.exec(input)
    return this.employeeCreatePresenter.exec(input)
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

class EmployeeCreatePresenter {
  exec(input: EmployeeCreateInput) {
    return `社員を登録しました: ${input.employeeName}`
  }
}
