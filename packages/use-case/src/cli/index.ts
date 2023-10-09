import {
  Employee,
  EmployeeRepositoryInterface,
  ProjectRepositoryInterface,
  ProductRepositoryInterface,
  Product, Project, EmployeeName, ID,
} from "@panda-project/core";
import {Low} from "lowdb";
import {DataBase, db} from "./repository";
import {AutoIncrementId} from "../common";

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

export class ProductRepository implements ProductRepositoryInterface {
  constructor(private readonly lowdb: Low<DataBase> = db) {}

  async findById(id: ID) {
    await this.lowdb.read()
    const { products } = this.lowdb.data

    const product = products.find((product) => product.id === id.value)
    if (!product) {
      throw new Error(`Product not found. id: ${id.value}`)
    }

    return new Product(new ID(product.id), product.name)
  }

  async existsWithoutId() {
    await this.lowdb.read()
    const { products } = this.lowdb.data

    return products.length > 0
  }

  async save(product: Product) {
    await this.lowdb.read()
    const { products } = this.lowdb.data

    const autoIncrementId = AutoIncrementId.createFromRecords(products)
    products.push({
      id: autoIncrementId.value,
      name: product.name,
    })

    await this.lowdb.write()
    return new Product(autoIncrementId, product.name)
  }
}

export class ProjectRepository implements ProjectRepositoryInterface {
  constructor(private readonly lowdb: Low<DataBase> = db) {}

  async save(project: Project) {
    await this.lowdb.read()
    const { projects } = this.lowdb.data

    const autoIncrementId = AutoIncrementId.createFromRecords(projects)
    projects.push({
      id: autoIncrementId.value,
      name: project.name,
    })

    return new Project(autoIncrementId, project.name)
  }
}

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
}
