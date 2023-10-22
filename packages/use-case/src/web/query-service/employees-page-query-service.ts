import {Employee, EmployeeRepositoryInterface} from "@panda-project/core";
import {EmployeeRepository} from "@/gateway";
import {Result} from "../types";

type Dto = {
  employees: {
    id: NonNullable<Employee['id']['value']>
    name: string
  }[]
}

export class EmployeesPageQueryService {
  constructor(
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository()
  ) {
  }

  async exec(): Promise<Result<Dto>> {
    const employees = await this.employeeRepository.findAll()

    if (employees.length === 0) {
      return {data: {employees: []}, error: null}
    }

    return {
      data: {
        employees: employees.map((employee) =>
          ({
            id: employee.id.value!,
            name: employee.employeeName.getFullName()
          })
        )
      },
      error: null
    }
  }
}
