import {Employee, EmployeeName, EmployeeRepositoryInterface} from "@panda-project/core";
import {EmployeeRepository} from "@/cli/repository";
import {AutoIncrementId} from "@/common";
import {FetchEmployeesUseCase} from "@/cli/scenario/use-case";

export type EmployeeEditCallback = (names: Awaited<ReturnType<FetchEmployeesUseCase['exec']>>) => Promise<EmployeeEditScenarioUserInputType>

export class EmployeeEditScenarioScenario {
  constructor(
    private readonly fetchEmployeesUseCase: FetchEmployeesUseCase = new FetchEmployeesUseCase(),
    private readonly employeeEditScenarioUseCase: EmployeeEditScenarioUseCase = new EmployeeEditScenarioUseCase(),
    private readonly employeeEditPresenter: EmployeeEditPresenter = new EmployeeEditPresenter(),
  ) {
  }

  async exec(callback: EmployeeEditCallback): Promise<string> {
    const employees = await this.fetchEmployeesUseCase.exec()
    const input = await callback(employees)
    const newEmployee = await this.employeeEditScenarioUseCase.exec(new EmployeeEditScenarioInput(input))
    return this.employeeEditPresenter.exec(newEmployee)
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

class EmployeeEditPresenter {
  exec(newEmployee: Employee) {
    return `${newEmployee.id.value}: ${newEmployee.employeeName.getFullName()}`
  }
}
