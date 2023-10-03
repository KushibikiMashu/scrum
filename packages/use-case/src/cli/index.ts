import {Product, Project, Employee} from "core/scrum";

export const add = (a: number, b: number) => a + b;

// init command
export class InitInput {
  constructor(
    public readonly productName: string,
    public readonly projectName: string,
    public readonly employeeName: string,
  ) {
  }
}

export class InitUseCase {
  constructor(
    private readonly initInput: InitInput
  ){
  }

  exec() {
    console.log(this.initInput.employeeName)

    // 保存する
    return null
  }
}

// repository の interface は domain 層に置く
export class ProductRepository {
  save(product: Product) {

  }
}

export class ProjectRepository {
  save(project: Project) {

  }
}

export class EmployeeRepository {
  save(employee: Employee) {

  }
}
