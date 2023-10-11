import {Employee, EmployeeRepositoryInterface} from "@panda-project/core";
import {Low} from "lowdb";
import {DataBase, db} from "@/cli/db";
import {AutoIncrementId} from "@/common";

export class EmployeeRepository implements EmployeeRepositoryInterface {
  constructor(private readonly lowdb: Low<DataBase> = db) {}

  async save(employee: Employee) {
    await this.lowdb.read()
    const { employees } = this.lowdb.data

    const autoIncrementId = AutoIncrementId.createFromRecords(employees)
    employees.push({
      id: autoIncrementId.value,
      first_name: employee.employeeName.firstName,
      family_name: employee.employeeName.familyName,
    })

    await this.lowdb.write()
    return new Employee(autoIncrementId, employee.employeeName)
  }

  async count() {
    await this.lowdb.read()
    const { employees } = this.lowdb.data
    return employees.length
  }
}

