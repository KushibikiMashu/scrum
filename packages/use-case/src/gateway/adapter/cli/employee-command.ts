import {CreateEmployeeCommand} from "@/use-case/employee";
import {EmployeeName} from "@panda-project/core";

export class CreateEmployeeCliCommand implements CreateEmployeeCommand {
  constructor(
    private readonly employeeName: string,
  ) {
  }

  getEmployeeName(): EmployeeName {
    return EmployeeName.createFromString(this.employeeName)
  }
}
