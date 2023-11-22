import {EmployeeRepositoryInterface, ScrumTeamRepositoryInterface} from "@panda-project/core";
import {EmployeeRepository, ScrumTeamRepository} from "@/gateway/repository/db";

export type EditTeamQueryServiceDto = {
  candidateEmployees: { id: number, name: string }[]
  productOwnerId: number
  scumMasterId: number
  developerIds: number[]
}

export class EditTeamQueryService {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {
  }

  async exec(): Promise<EditTeamQueryServiceDto> {
    const employees = await this.employeeRepository.findAll()
    const scrumTeam = await this.scrumTeamRepository.fetchOrFail()

    const employeeIdsWithoutPoAndSm = employees.filter(employee => {
      const isPo = scrumTeam.productOwner.getId() === employee.id.value
      const isSm = scrumTeam.scrumMaster.getId() === employee.id.value
      return !isPo && !isSm
    }).map(employee => ({
      id: employee.id.value!,
      name: employee.employeeName.getFullName(),
    }))

    return {
      candidateEmployees: employeeIdsWithoutPoAndSm,
      productOwnerId: scrumTeam.getProductOwnerId(),
      scumMasterId: scrumTeam.getScrumMasterId(),
      developerIds: scrumTeam.getDevelopersIds(),
    }
  }
}
