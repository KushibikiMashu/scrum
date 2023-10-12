import {ID} from "@/common";

export class Company {

}

export class Department {
  constructor(public readonly name: string) {
  }
}

export class EmployeeName {
  constructor(
    public readonly firstName: string,
    public readonly familyName: string,
  ) {
  }

  static createFromString(name: string): EmployeeName {
    if (!name.includes(' ')) {
      throw new Error('社員名は姓名を半角スペースで区切ってください')
    }

    const [familyName, firstName] = name.split(' ')

    return new EmployeeName(familyName, firstName)
  }

  getFullName() {
    return `${this.familyName} ${this.firstName}`
  }
}

export class Employee {
  constructor(
    public readonly id: ID, // TODO: Employee の ID は NonNullId にしないといけないかもしれない
    public readonly employeeName: EmployeeName,
  ) {
  }

  updateName(name: EmployeeName) {
    return new Employee(this.id, name)
  }
}

export interface EmployeeRepositoryInterface {
  findByIdOrFail(id: ID): Promise<Employee>
  findAll(): Promise<Employee[]>
  count(): Promise<number>
  save(employee: Employee): Promise<Employee>
  update(employee: Employee): Promise<Employee>
  delete(employee: Employee): Promise<void>
}

export class Member {
  constructor(
    public readonly employee: Employee,
    // 部署を使うようになったら追加する
    // public readonly department: Department,
  ) {
  }

  static createFromEmployee(employee: Employee) {
    return new Member(employee)
  }
}
