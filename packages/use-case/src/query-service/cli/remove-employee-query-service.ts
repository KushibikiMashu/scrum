import {EmployeeRepositoryInterface} from "@panda-project/core";
import {EmployeeRepository} from "@/gateway/repository/db";

export type RemoveEmployeeQueryServiceDto = {id: number; name: string}[]

export class RemoveEmployeeQueryService {
  constructor(
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {
  }

  async exec(): Promise<RemoveEmployeeQueryServiceDto> {
    const employees = await this.employeeRepository.findAll()
    return employees.map(employee => ({
      id: employee.id.value!,
      name: employee.employeeName.getFullName(),
    }))
  }
}