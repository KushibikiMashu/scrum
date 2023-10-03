import {
  Employee,
  EmployeeRepositoryInterface,
  ProjectRepositoryInterface,
  ProductRepositoryInterface,
  Product, Project, EmployeeName,
} from "@panda-project/core";

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
  private readonly db = {}

  save(employee: Employee) {
    // db.save()

    return employee
  }
}
