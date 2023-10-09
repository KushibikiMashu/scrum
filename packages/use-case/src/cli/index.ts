import {
  Employee,
  EmployeeRepositoryInterface,
  ProjectRepositoryInterface,
  ProductRepositoryInterface,
  Product, Project, EmployeeName, ID,
} from "@panda-project/core";
import {Low} from "lowdb";
import {DataBase, db} from "./repository";
import {AutoIncrementId} from "@/common";

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

  async save(product: Product) {
    await this.lowdb.read()
    const { products } = this.lowdb.data

    const autoIncrementId = AutoIncrementId.createFromRecords(products)
    products.push({
      id: autoIncrementId.id,
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
      id: autoIncrementId.id,
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
      id: autoIncrementId.id,
      first_name: employee.employeeName.firstName,
      family_name: employee.employeeName.familyName,
    })

    await this.lowdb.write()
    return new Employee(autoIncrementId, employee.employeeName)
  }
}
