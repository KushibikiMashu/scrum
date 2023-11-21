import {EmployeeRepositoryInterface} from "@panda-project/core";
import {EmployeeRepository} from "@/gateway/repository/db";

export class FetchEmployeesUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {
  }

  async exec(): Promise<{id: number; name: string}[]> {
    const employees = await this.employeeRepository.findAll()
    return employees.map(employee => ({
      id: employee.id.value!,
      name: employee.employeeName.getFullName(),
    }))
  }
}
