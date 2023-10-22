import {Employee, EmployeeName, EmployeeRepositoryInterface, ID} from "@panda-project/core";
import {EmployeeRepository} from "@/gateway";

export class CreateEmployeeCommand {
  constructor(
    public readonly familyName: string,
    public readonly firstName: string,
  ) {
  }

  getEmployeeName(): EmployeeName {
    return new EmployeeName(this.firstName, this.familyName)
  }
}

export class EmployeeUseCase {
  constructor(
    private readonly productRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {
  }

  async create(command: CreateEmployeeCommand) {
    const employeeName = command.getEmployeeName()
    const employee = new Employee(ID.createAsNull(), employeeName)
    return await this.productRepository.save(employee)
  }
}
