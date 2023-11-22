import {
  CreateEmployeeCommand,
  CreateMultipleEmployeeCommand,
  EditEmployeeCommand,
  RemoveEmployeeCommand
} from "@/use-case/employee";
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

export class CreateMultipleEmployeeCliCommand implements CreateMultipleEmployeeCommand {
  constructor(
    private readonly commaSeparatedNames: string,
  ) {
  }

  getEmployeeNames(): EmployeeName[] {
    return this.commaSeparatedNames.split(',')
      .map((name) => name.trim())
      .map((name) => EmployeeName.createFromString(name))
  }
}

// TODO: 後から output adapter として実装する
// export class CreateMultipleEmployeeCliPresenter {
//   exec(dto): string {
//     return `社員を登録しました: ${input.count()}名`
//   }
// }

export class EditEmployeeCliCommand implements EditEmployeeCommand {
  constructor(
    private readonly employeeId: number,
    private readonly newEmployeeName: string,
  ) {
  }

  getEmployeeId(): AutoIncrementId { // 本当は EmployeeId を返すのが良い
    return new AutoIncrementId(this.employeeId)
  }

  getNewEmployeeName(): EmployeeName {
    return EmployeeName.createFromString(this.newEmployeeName)
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