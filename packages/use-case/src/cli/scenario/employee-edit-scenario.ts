import {EmployeeName, EmployeeRepositoryInterface, ID} from "@panda-project/core";
import {EmployeeRepository} from "@/cli/repository";
import {AutoIncrementId, Logger} from "@/common";
import {FetchEmployeesUseCase} from "@/cli/scenario/use-case";

export type EmployeeEditCallbackArg = Awaited<ReturnType<FetchEmployeesUseCase['exec']>>

export class EmployeeEditScenarioScenario {
  constructor(
    private readonly fetchEmployeesUseCase: FetchEmployeesUseCase = new FetchEmployeesUseCase(),
    private readonly employeeEditScenarioUseCase: EmployeeEditScenarioUseCase = new EmployeeEditScenarioUseCase(),
    private readonly logger: Logger = console,
  ) {
  }

  async exec(callback: (names: EmployeeEditCallbackArg) => Promise<EmployeeEditScenarioUserInputType>): Promise<void> {
    try {
      const employees = await this.fetchEmployeesUseCase.exec()
      const input = await callback(employees)
      const newEmployee = await this.employeeEditScenarioUseCase.exec(new EmployeeEditScenarioInput(input))
      this.logger.info(`${newEmployee.id.value}: ${newEmployee.employeeName.getFullName()}`);
    } catch (e: any) {
      this.logger.error(e?.message)
    }
  }
}

type EmployeeEditScenarioUserInputType = {
  employeeId: number,
  newEmployeeName: string,
}

class EmployeeEditScenarioInput {
  constructor(private readonly userInput: EmployeeEditScenarioUserInputType) {}

  getEmployeeId() {
    return new AutoIncrementId(this.userInput.employeeId)
  }

  getEmployeeName() {
    return EmployeeName.createFromString(this.userInput.newEmployeeName)
  }
}

class EmployeeEditScenarioUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {
  }

  async exec(input: EmployeeEditScenarioInput) {
    const employee = await this.employeeRepository.findByIdOrFail(input.getEmployeeId())
    const newEmployee = employee.updateName(input.getEmployeeName())
    return await this.employeeRepository.update(newEmployee)
  }
}
