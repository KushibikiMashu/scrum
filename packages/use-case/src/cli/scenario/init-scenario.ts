import {
  Employee, EmployeeName,
  EmployeeRepositoryInterface, ID,
  Product,
  ProductRepositoryInterface, Project,
  ProjectRepositoryInterface
} from "@panda-project/core";
import {EmployeeRepository, ProductRepository, ProjectRepository} from "@/cli/repository";

type InitUserInputType = {
  product: string
  project: string
  employee: string
}

export class InitScenario {
  constructor(
    private readonly initValidateUseCase: InitValidateUseCase = new InitValidateUseCase(),
    private readonly initSetUpUseCase: InitSetUpUseCase = new InitSetUpUseCase(),
  ) {
  }

  async exec(callback: () => Promise<InitUserInputType>): Promise<void> {
    await this.initValidateUseCase.exec()
    const input = await callback()
    await this.initSetUpUseCase.exec(new InitInput(input.product, input.project, input.employee))
  }
}

class InitInput {
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

class InitValidateUseCase {
  constructor(
    private readonly productRepository: ProductRepositoryInterface = new ProductRepository(),
  ) {
  }

  async exec(): Promise<void> {
    // 1つしかないはずなので、存在しない場合はエラーにする
    // 本格的にやるなら（product の id を取得するなら）、CLIでもログインする機能が必要
    const existsProduct = await this.productRepository.existsWithoutId()
    if (existsProduct) {
      throw new Error('初期設定が完了済みです。設定を編集するためには別のコマンドを利用してください')
    }
  }
}

class InitSetUpUseCase {
  constructor(
    private readonly productRepository: ProductRepositoryInterface = new ProductRepository(),
    private readonly projectRepository: ProjectRepositoryInterface = new ProjectRepository(),
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {
  }

  async exec(initInput: InitInput): Promise<void> {
    // いつか try catch で囲む
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
  }
}
