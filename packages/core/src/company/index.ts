export class Company {

}

export class Department {
  constructor(public readonly name: string) {
  }
}

export class Employee {
  constructor(
    public readonly firstName: string,
    public readonly familyName: string,
  ) {
  }

  getName() {
    return `${this.familyName} ${this.firstName}`
  }
}

export class Member {
  constructor(
    public readonly employee: Employee,
    // 部署を使うようになったら追加する
    // public readonly department: Department,
  ) {
  }
}
