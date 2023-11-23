import {EmployeeRepositoryInterface, ID} from "@panda-project/core";
import {EmployeeRepository} from "@/gateway/repository/db";
import {AutoIncrementId} from "@/common";

export class EditScrumTeamQueryServiceInput {
  constructor(private readonly employeeIds: number[]) {
  }

  getEmployeeIds(): ID[] {
    return this.employeeIds.map((id) => new AutoIncrementId(id))
  }
}

export type EditScrumTeamQueryServiceDto = {
  candidateEmployees: { id: number, name: string }[]
}

export class EditScrumTeamQueryService {
  constructor(
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {
  }

  async exec(input: EditScrumTeamQueryServiceInput | null = null): Promise<EditScrumTeamQueryServiceDto> {
    const employees = await this.employeeRepository.findAll()
    const ids = input?.getEmployeeIds() ?? []

    const candidateEmployees = employees
      .filter(employee => {
        for (const id of ids) {
          if (id.equals(employee.id)) {
            return false
          }
        }
        return true
      })
      .map(employee => ({
        id: employee.id.value!,
        name: employee.employeeName.getFullName(),
      }))

    console.log(candidateEmployees, 'candidateEmployees');

    return {
      candidateEmployees,
    }
  }
}
