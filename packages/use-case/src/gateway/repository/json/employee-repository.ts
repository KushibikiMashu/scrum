import {Employee, EmployeeId, EmployeeName, EmployeeRepositoryInterface} from "@panda-project/core";
import {Low} from "lowdb";
import {DataBase, db, EmployeesSchema} from "@/external/db";
import {AutoIncrementId} from "@/common";
import {JsonRepository} from "./json-repository";

export class EmployeeRepository extends JsonRepository implements EmployeeRepositoryInterface {
  constructor(private readonly lowdb: Low<DataBase> = db) {
    super()
  }

  private nextId(): EmployeeId {
    return new EmployeeId(this.calculateNewId(this.lowdb.data.employees))
  }

  async findByIdOrFail(id: AutoIncrementId): Promise<Employee> {
    await this.lowdb.read()
    const {employees} = this.lowdb.data
    const employee = employees.find(v => v.id === id.value)
    if (!employee) {
      throw new Error(`社員ID ${id.value} は存在しません`)
    }
    return this.mapToEmployee(employee)
  }

  async findAll(): Promise<Employee[]> {
    await this.lowdb.read()
    const {employees} = this.lowdb.data

    return employees.map(this.mapToEmployee)
  }

  async count() {
    await this.lowdb.read()
    const { employees } = this.lowdb.data
    return employees.length
  }

  private mapToEmployee(record: EmployeesSchema[number]): Employee {
    return new Employee(
      new AutoIncrementId(record.id),
      new EmployeeName(record.first_name, record.family_name),
    )
  }

  async save(employee: Employee) {
    await this.lowdb.read()
    const { employees } = this.lowdb.data

    const employeeId = this.nextId()
    employees.push({
      id: employeeId.toInt(),
      first_name: employee.employeeName.firstName,
      family_name: employee.employeeName.familyName,
    })

    await this.lowdb.write()
    return new Employee(employeeId, employee.employeeName)
  }

  async update(newEmployee: Employee) {
    await this.lowdb.read()
    const {employees} = this.lowdb.data

    const newEmployeeId = newEmployee.id.value
    const index = employees.findIndex(v => v.id === newEmployeeId)
    if (index === -1) {
      throw new Error(`社員ID ${newEmployeeId} は存在しません`)
    }

    employees[index] = {
      id: newEmployeeId!,
      first_name: newEmployee.employeeName.firstName,
      family_name: newEmployee.employeeName.familyName,
    }

    await this.lowdb.write()
    return newEmployee
  }

  async delete(employee: Employee) {
    await this.lowdb.read()
    const {employees} = this.lowdb.data

    const index = employees.findIndex(v => v.id === employee.id.value)
    if (index === -1) {
      throw new Error(`社員ID ${employee.id.value} は存在しません`)
    }

    employees.splice(index, 1)

    await this.lowdb.write()
  }
}
