import {EmployeeName} from "@panda-project/core";
import {AutoIncrementId} from "@/common";
import {CreateEmployeeCommand} from "@/use-case";

export class CreateEmployeeWebCommand implements CreateEmployeeCommand {
  constructor(
    public readonly familyName: string,
    public readonly firstName: string,
  ) {
  }

  getEmployeeName(): EmployeeName {
    return new EmployeeName(this.firstName, this.familyName)
  }
}

 class EditEmployeeCommand {
  constructor(
    public readonly employeeId: number,
    public readonly newFamilyName: string,
    public readonly newFirstName: string,
  ) {
  }

  getEmployeeId(): AutoIncrementId { // 本当は EmployeeId を返すのが良い
    return new AutoIncrementId(this.employeeId)
  }

  getNewEmployeeName(): EmployeeName {
    return new EmployeeName(this.newFirstName, this.newFamilyName)
  }
}

 class DeleteEmployeeCommand {
  constructor(
    public readonly employeeId: number,
  ) {
  }

  getEmployeeId(): AutoIncrementId {
    return new AutoIncrementId(this.employeeId)
  }
}
