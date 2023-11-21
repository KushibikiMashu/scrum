import {EmployeeRepositoryInterface} from "@panda-project/core";
import {EmployeeRepository} from "@/gateway/repository/db";
import {AutoIncrementId} from "@/common";
import {FetchEmployeesUseCase} from "@/cli/scenario/use-case";

export type EmployeeRemoveCallback = (arg: Awaited<ReturnType<FetchEmployeesUseCase['exec']>>) => Promise<EmployeeRemoveScenarioUserInputType>

export class EmployeeRemoveScenario {
  constructor(
    private readonly fetchEmployeesUseCase: FetchEmployeesUseCase = new FetchEmployeesUseCase(),
    private readonly employeeRemoveScenarioUseCase: EmployeeRemoveUseCase = new EmployeeRemoveUseCase(),
    private readonly employeeRemovePresenter: EmployeeRemovePresenter = new EmployeeRemovePresenter(),
  ) {
  }

  async exec(callback: EmployeeRemoveCallback): Promise<string> {
    const employees = await this.fetchEmployeesUseCase.exec()
    const userInput = await callback(employees)
    const input = new EmployeeRemoveScenarioInput(userInput)

    await this.employeeRemoveScenarioUseCase.exec(input)
    return this.employeeRemovePresenter.exec(input)
  }
}

type EmployeeRemoveScenarioUserInputType = {
  employeeId: number,
}

class EmployeeRemoveScenarioInput {
  constructor(private readonly userInput: EmployeeRemoveScenarioUserInputType) {}

  getEmployeeId() {
    return new AutoIncrementId(this.userInput.employeeId)
  }
}

class EmployeeRemoveUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {
  }

  async exec(input: EmployeeRemoveScenarioInput) {
    const employee = await this.employeeRepository.findByIdOrFail(input.getEmployeeId())
    await this.employeeRepository.delete(employee)
  }
}

class EmployeeRemovePresenter {
  exec(input: EmployeeRemoveScenarioInput) {
    return `社員ID ${input.getEmployeeId().value} を削除しました`
  }
}
