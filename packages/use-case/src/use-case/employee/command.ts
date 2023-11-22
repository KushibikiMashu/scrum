import {EmployeeName} from "@panda-project/core";
import {AutoIncrementId} from "@/common";

export interface CreateEmployeeCommand {
  getEmployeeName(): EmployeeName;
}

export interface EditEmployeeCommand {
  getEmployeeId(): AutoIncrementId; // 本当は EmployeeId を返すのが良い
  getNewEmployeeName(): EmployeeName;
}

export interface DeleteEmployeeCommand {
  getEmployeeId(): AutoIncrementId;
}