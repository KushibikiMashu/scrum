import { EmployeeRepositoryInterface } from '@panda-project/core'

import { EmployeeRepository } from '@/gateway/repository/json'

export type EditEmployeeQueryServiceDto = { id: number; name: string }[]

export class EditEmployeeQueryService {
  constructor(private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository()) {}

  async exec(): Promise<EditEmployeeQueryServiceDto> {
    const employees = await this.employeeRepository.findAll()
    return employees.map((employee) => ({
      id: employee.id.toInt(),
      name: employee.employeeName.getFullName(),
    }))
  }
}
