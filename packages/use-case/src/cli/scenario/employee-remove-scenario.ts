import {EmployeeRepositoryInterface} from "@panda-project/core";
import {EmployeeRepository} from "@/cli/repository";
import {AutoIncrementId, Logger} from "@/common";
import {FetchEmployeesUseCase} from "@/cli/scenario/use-case";

export class EmployeeRemoveScenario {
  constructor(
    private readonly fetchEmployeesUseCase: FetchEmployeesUseCase = new FetchEmployeesUseCase(),
    private readonly employeeRemoveScenarioUseCase: EmployeeRemoveUseCase = new EmployeeRemoveUseCase(),
    private readonly logger: Logger = console,
  ) {
  }

  async exec(callback: (arg: EmployeeRemoveCallbackArg) => Promise<EmployeeRemoveScenarioUserInputType>): Promise<void> {
    try {
      const employees = await this.fetchEmployeesUseCase.exec()
      const input = await callback(employees)
      await this.employeeRemoveScenarioUseCase.exec(new EmployeeRemoveScenarioInput(input))
      this.logger.info(`社員ID ${input.employeeId} を削除しました`);
    } catch (e: any) {
      this.logger.error(e?.message)
    }
  }
}

export type EmployeeRemoveCallbackArg = Awaited<ReturnType<FetchEmployeesUseCase['exec']>>

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
