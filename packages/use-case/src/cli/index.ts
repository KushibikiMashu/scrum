import {
  Employee,
  EmployeeRepositoryInterface,
  ProjectRepositoryInterface,
  ProductRepositoryInterface,
  Product, Project, EmployeeName,
} from "@panda-project/core";
import {Low} from "lowdb";
import {DataBase, db} from "./repository";

export class InitInput {
  constructor(
    public readonly productName: string,
    public readonly projectName: string,
    public readonly employeeName: string,
  ) {
  }

  getEmployeeName() {
    return EmployeeName.createFromString(this.employeeName)
  }
}

export class InitUseCaseFactory {
  create(): InitUseCase {
    return new InitUseCase(
      new EmployeeRepository()
    )
  }
}

export class InitUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepositoryInterface,
  ) {
  }

  async exec(initInput: InitInput) {
    // 保存する
    const employee = new Employee(initInput.getEmployeeName())
    await this.employeeRepository.save(employee)

    return null
  }
}

// TODO: interface を implement する
// export class ProductRepository implements ProductRepositoryInterface {
//   save(product: Product) {
//
//   }
// }
//
// export class ProjectRepository implements ProjectRepositoryInterface {
//   save(project: Project) {
//
//   }
// }

export class EmployeeRepository implements EmployeeRepositoryInterface {
  constructor(private readonly lowdb: Low<DataBase> = db) {}

  async save(employee: Employee) {
    await this.lowdb.read()
    const { posts } = this.lowdb.data

    posts.push(employee.employeeName.getFullName())

    await this.lowdb.write()
    return employee
  }
}
