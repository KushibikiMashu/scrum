import {EmployeeRepositoryInterface} from "@panda-project/core";
import {EmployeeRepository} from "@/gateway/repository/db";

export type EditEmployeeQueryServiceDto = {id: number; name: string}[]

export class EditEmployeeQueryService {
  constructor(
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {
  }

  async exec(): Promise<EditEmployeeQueryServiceDto> {
    const employees = await this.employeeRepository.findAll()
    return employees.map(employee => ({
      id: employee.id.value!,
      name: employee.employeeName.getFullName(),
    }))
  }
}
