import {EmployeeRepositoryInterface, Id, ScrumTeamRepositoryInterface} from "@panda-project/core";
import {EmployeeRepository, ScrumTeamRepository} from "@/gateway/repository/json";
import {AutoIncrementId} from "@/common";

export type EditScrumTeamQueryServiceDto = {
  candidateEmployees: { id: number, name: string }[]
  productOwnerId: number
  scumMasterId: number
  developerIds: number[]
}

export class EditScrumTeamQueryServiceInput {
  constructor(private readonly employeeIds: number[]) {
  }

  getEmployeeIds(): Id[] {
    return this.employeeIds.map((id) => new AutoIncrementId(id))
  }
}

export class EditScrumTeamQueryService {
  constructor(
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
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

    const scrumTeam = await this.scrumTeamRepository.fetchOrFail()

    return {
      candidateEmployees,
      productOwnerId: scrumTeam.getProductOwnerId(),
      scumMasterId: scrumTeam.getScrumMasterId(),
      developerIds: scrumTeam.getDevelopersIds(),
    }
  }
}
