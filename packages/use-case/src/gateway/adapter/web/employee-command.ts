import { EmployeeId, EmployeeName } from '@panda-project/core'
import { AutoIncrementId } from '@/common'
import { CreateEmployeeCommand, RemoveEmployeeCommand, EditEmployeeCommand } from '@/use-case/employee'

export class CreateEmployeeWebCommand implements CreateEmployeeCommand {
  constructor(
    private readonly familyName: string,
    private readonly firstName: string
  ) {}

  getEmployeeName(): EmployeeName {
    return new EmployeeName(this.firstName, this.familyName)
  }
}

export class EditEmployeeWebCommand implements EditEmployeeCommand {
  constructor(
    private readonly employeeId: number,
    private readonly newFamilyName: string,
    private readonly newFirstName: string
  ) {}

  getEmployeeId(): EmployeeId {
    return new AutoIncrementId(this.employeeId)
  }

  getNewEmployeeName(): EmployeeName {
    return new EmployeeName(this.newFirstName, this.newFamilyName)
  }
}

export class RemoveEmployeeWebCommand implements RemoveEmployeeCommand {
  constructor(private readonly employeeId: number) {}

  getEmployeeId(): EmployeeId {
    return new AutoIncrementId(this.employeeId)
  }
}
