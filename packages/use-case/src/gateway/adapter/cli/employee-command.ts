import {CreateEmployeeCommand, RemoveEmployeeCommand} from "@/use-case/employee";
import {EmployeeName} from "@panda-project/core";
import {AutoIncrementId} from "@/common";

export class CreateEmployeeCliCommand implements CreateEmployeeCommand {
  constructor(
    private readonly employeeName: string,
  ) {
  }

  getEmployeeName(): EmployeeName {
    return EmployeeName.createFromString(this.employeeName)
  }
}

export class RemoveEmployeeCliCommand implements RemoveEmployeeCommand {
  constructor(
    private readonly employeeId: number,
  ) {
  }

  getEmployeeId(): AutoIncrementId {
    return new AutoIncrementId(this.employeeId)
  }
}
