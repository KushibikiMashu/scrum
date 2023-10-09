import {
  Employee, EmployeeName,
  EmployeeRepositoryInterface, ID,
  Product,
  ProductRepositoryInterface, Project,
  ProjectRepositoryInterface
} from "@panda-project/core";
import {EmployeeRepository, ProductRepository, ProjectRepository} from "@/cli/repository";

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
      new ProductRepository(),
      new ProjectRepository(),
      new EmployeeRepository()
    )
  }
}

export class InitUseCase {
  constructor(
    private readonly productRepository: ProductRepositoryInterface,
    private readonly projectRepository: ProjectRepositoryInterface,
    private readonly employeeRepository: EmployeeRepositoryInterface,
  ) {
  }

  async exec(initInput: InitInput) {
    // いつか try catch で囲む
    // 1つしかないはずなので、存在しない場合はエラーにする
    // 本格的にやるなら（product の id を取得するなら）、CLIでもログインする機能が必要

    const existsProduct = await this.productRepository.existsWithoutId()
    if (existsProduct) {
      throw new Error('初期設定が完了済みです。設定をするためには別のコマンドを利用してください')
    }

    const product = new Product(
      ID.createAsNull(),
      initInput.productName
    )
    await this.productRepository.save(product)

    const project = new Project(
      ID.createAsNull(),
      initInput.projectName,
    )
    await this.projectRepository.save(project)

    const employee = new Employee(
      ID.createAsNull(),
      initInput.getEmployeeName()
    )
    await this.employeeRepository.save(employee)

    return null
  }
}
