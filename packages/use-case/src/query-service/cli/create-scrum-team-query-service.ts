import { EmployeeRepositoryInterface, ScrumTeamRepositoryInterface } from '@panda-project/core'

import { EmployeeRepository, ScrumTeamRepository } from '@/gateway/repository/json'

export type CreateScrumTeamQueryServiceDto = {
  employees: { id: number; name: string }[]
}

export class CreateScrumTeamQueryService {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository()
  ) {}

  async exec(): Promise<CreateScrumTeamQueryServiceDto> {
    const employees = await this.employeeRepository.findAll()
    const scrumTeam = await this.scrumTeamRepository.fetchOrFail()

    const employeeIdsWithoutPoAndSm = employees
      .filter((employee) => {
        const isPo = scrumTeam.productOwner.getId() === employee.id.value
        const isSm = scrumTeam.scrumMaster.getId() === employee.id.value
        return !isPo && !isSm
      })
      .map((employee) => ({
        id: employee.id.toInt(),
        name: employee.employeeName.getFullName(),
      }))

    return {
      employees: employeeIdsWithoutPoAndSm,
    }
  }
}
