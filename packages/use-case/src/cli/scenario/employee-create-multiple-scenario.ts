import {Employee, EmployeeName, EmployeeRepositoryInterface, ID} from "@panda-project/core";
import {EmployeeRepository} from "@/cli/repository";

export class EmployeeCreateMultipleScenario {
  constructor(
    private readonly validateUseCase: ValidateUseCase = new ValidateUseCase(),
    private readonly createEmployeeUseCase: CreateEmployeeUseCase = new CreateEmployeeUseCase(),
    private readonly createEmployeePresenter: CreateEmployeePresenter = new CreateEmployeePresenter(),
  ) {}

  async exec(callback: () => Promise<EmployeeCreateMultipleUserInputType>): Promise<string> {
    const input = await callback()
    const employeeCreateMultipleInput = new EmployeeCreateMultipleInput(input.employee)

    await this.validateUseCase.exec(employeeCreateMultipleInput)
    await this.createEmployeeUseCase.exec(employeeCreateMultipleInput)

    return this.createEmployeePresenter.exec(employeeCreateMultipleInput)
  }
}

type EmployeeCreateMultipleUserInputType = {
  employee: string // `Satoshi Tanaka, Taro Yamada, Hanako Yamada`のような入力
}

class EmployeeCreateMultipleInput {
  constructor(public readonly employeeName: string) {}

  getEmployeeNames() {
    const names = this.employeeName.split(',').map(name => name.trim())
    return names.map(name => EmployeeName.createFromString(name))
  }

  count() {
    return this.getEmployeeNames().length
  }
}

class ValidateUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {
  }

  async exec(input: EmployeeCreateMultipleInput) {
    const dbCount = await this.employeeRepository.count()
    const inputCount = input.count()
    if (dbCount + inputCount > 50) {
      throw new Error(`登録できる従業員数の上限に達しました。登録可能な人数は50名以下です: ${dbCount + inputCount}名`)
    }
  }
}

class CreateEmployeeUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {
  }

  async exec(input: EmployeeCreateMultipleInput) {
    for(const employeeName of input.getEmployeeNames()) {
      const employee = new Employee(
        ID.createAsNull(),
        employeeName,
      )
      await this.employeeRepository.save(employee)
    }
  }
}

class CreateEmployeePresenter {
  exec(input: EmployeeCreateMultipleInput): string {
    return `社員を登録しました: ${input.count()}名`
  }
}
