import {Employee, EmployeeName, EmployeeRepositoryInterface, ID} from "@panda-project/core";
import {EmployeeRepository} from "@/gateway";
import {AutoIncrementId} from "@/common";

export class CreateEmployeeCommand {
  constructor(
    public readonly familyName: string,
    public readonly firstName: string,
  ) {
  }

  getEmployeeName(): EmployeeName {
    return new EmployeeName(this.firstName, this.familyName)
  }
}

export class EditEmployeeCommand {
  constructor(
    public readonly employeeId: number,
    public readonly newFamilyName: string,
    public readonly newFirstName: string,
  ) {
  }

  getEmployeeId(): AutoIncrementId {
    return new AutoIncrementId(this.employeeId)
  }

  getNewEmployeeName(): EmployeeName {
    return new EmployeeName(this.newFirstName, this.newFamilyName)
  }
}

export class EmployeeUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {
  }

  async create(command: CreateEmployeeCommand) {
    const employeeName = command.getEmployeeName()
    const employee = new Employee(ID.createAsNull(), employeeName)

    await this.employeeRepository.save(employee)
  }

  async edit(command: EditEmployeeCommand) {
    const employee = await this.employeeRepository.findByIdOrFail(command.getEmployeeId())
    const newName = command.getNewEmployeeName()
    const newEmployee = employee.updateName(newName)

    await this.employeeRepository.update(newEmployee)
  }
}
