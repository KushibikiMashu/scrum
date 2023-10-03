import {Product, Project, Employee} from "core/scrum";
import {EmployeeRepositoryInterface} from "core/dist/company";

export const add = (a: number, b: number) => a + b;

// init command
export class InitInput {
  constructor(
    public readonly productName: string,
    public readonly projectName: string,
    public readonly employeeName: string,
  ) {
    this.validate()
  }

  getEmployeeFamilyName() {
    return this.employeeName.split(' ').at(0)
  }

  getEmployeeFirstName() {
    return this.employeeName.split(' ').at(1)
  }

  validate() {
    if (!this.employeeName.includes(' ')) {
      throw new Error('社員名はスペースで生命を区切ってください')
    }
  }
}

export class InitUseCase {
  constructor(
    private readonly initInput: InitInput,
    private readonly employeeRepository: EmployeeRepositoryInterface,
  ){
  }

  exec() {
    // 保存する
    this.employeeRepository.save(
      new Employee(
        this.initInput.getEmployeeFirstName(),
        this.initInput.getEmployeeFamilyName()
      )
    )


    return null
  }
}

// TODO: interface を implement する
export class ProductRepository {
  save(product: Product) {

  }
}

export class ProjectRepository {
  save(project: Project) {

  }
}

export class EmployeeRepository {
  private readonly db = {}

  save(employee: Employee) {
    db.save()
  }
}
