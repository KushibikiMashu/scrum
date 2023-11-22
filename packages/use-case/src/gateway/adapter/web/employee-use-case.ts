import {EmployeeName} from "@panda-project/core";
import {AutoIncrementId} from "@/common";
import {CreateEmployeeCommand, DeleteEmployeeCommand, EditEmployeeCommand} from "@/use-case";

export class CreateEmployeeWebCommand implements CreateEmployeeCommand {
  constructor(
    private readonly familyName: string,
    private readonly firstName: string,
  ) {
  }

  getEmployeeName(): EmployeeName {
    return new EmployeeName(this.firstName, this.familyName)
  }
}

export class EditEmployeeWebCommand implements EditEmployeeCommand {
  constructor(
    private readonly employeeId: number,
    private readonly newFamilyName: string,
    private readonly newFirstName: string,
  ) {
  }

  getEmployeeId(): AutoIncrementId { // 本当は EmployeeId を返すのが良い
    return new AutoIncrementId(this.employeeId)
  }

  getNewEmployeeName(): EmployeeName {
    return new EmployeeName(this.newFirstName, this.newFamilyName)
  }
}

export class DeleteEmployeeWebCommand implements DeleteEmployeeCommand {
  constructor(
    private readonly employeeId: number,
  ) {
  }

  getEmployeeId(): AutoIncrementId {
    return new AutoIncrementId(this.employeeId)
  }
}
