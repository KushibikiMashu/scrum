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

  exec(initInput: InitInput) {
    // 保存する
    this.employeeRepository.save(
      new Employee(
        initInput.getEmployeeName(),
      )
    )

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
    // Read data from JSON file, this will set db.data content
    // If JSON file doesn't exist, defaultData is used instead
    await this.lowdb.read()

    // If you don't want to type this.lowdb.data everytime, you can use destructuring assignment
    const { posts } = this.lowdb.data
    posts.push('hello world')
    posts.push(employee.employeeName.getFullName())

    // Finally write this.lowdb.data content to file
    await this.lowdb.write()

    this.lowdb.data.posts.push('foo') // ✅ Success
    this.lowdb.data.posts.push(employee.employeeName.getFullName()) // ✅ Success
    return employee
  }
}
