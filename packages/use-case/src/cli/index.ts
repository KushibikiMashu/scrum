import {Employee,
  EmployeeRepositoryInterface,
  ProjectRepositoryInterface,
  ProductRepositoryInterface,
  Product, Project
} from "@panda-project/core";

export class InitInput {
  constructor(
    public readonly productName: string,
    public readonly projectName: string,
    public readonly employeeName: string,
  ) {
    this.validate()
  }

  getEmployeeFamilyName() {
    return this.employeeName.split(' ').at(0)!
  }

  getEmployeeFirstName() {
    return this.employeeName.split(' ').at(1)!
  }

  validate() {
    if (!this.employeeName.includes(' ')) {
      throw new Error('社員名は姓名をスペースで区切ってください')
    }
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
  ){
  }

  exec(initInput: InitInput) {
    // 保存する
    this.employeeRepository.save(
      new Employee(
        initInput.getEmployeeFirstName(),
        initInput.getEmployeeFamilyName()
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
