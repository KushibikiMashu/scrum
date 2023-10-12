import {EmployeeRepositoryInterface, ScrumTeamRepositoryInterface} from "@panda-project/core";
import {EmployeeRepository, ScrumTeamRepository} from "@/cli/repository";

export class FetchAllEmployeesWithoutPoAndSmUseCase {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {
  }

  async exec(): Promise<{id: number; name: string}[]> {
    const employees = await this.employeeRepository.findAll()
    const scrumTeam = await this.scrumTeamRepository.fetch()
    return employees.filter(employee => {
      const isPo = scrumTeam.productOwner.member.employee.id.value === employee.id.value
      const isSm = scrumTeam.scrumMaster.member.employee.id.value === employee.id.value
      return !isPo && !isSm
    }).map(employee => ({
      id: employee.id.value!,
      name: employee.employeeName.getFullName(),
    }))
  }
}
