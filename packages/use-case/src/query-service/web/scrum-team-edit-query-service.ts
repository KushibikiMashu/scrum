import {DefaultError, ErrorReason, Result} from "./types";
import {
  EmployeeRepositoryInterface,
  ProjectRepositoryInterface,
  ScrumTeamRepositoryInterface
} from "@panda-project/core";
import {EmployeeRepository, ProjectRepository, ScrumTeamRepository} from "@/gateway/repository/json";

export type ScrumTeamEditQueryServiceDto = {
  scrumTeam: {
    id: number
    scrumMaster: {
      employeeId: number
      name: string
      isDeveloper: boolean
    }
    productOwner: {
      employeeId: number
      name: string
      isDeveloper: boolean
    }
    developers: {
      employeeId: number
      name: string
    }[]
  } | null
  employees: {
    id: number
    fullName: string
  }[]
  project: {
    name: string
  }
}

interface CustomError extends DefaultError {
  reason: typeof ErrorReason.ProjectNotExists
}

export class ScrumTeamEditQueryService {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
    private readonly projectRepository: ProjectRepositoryInterface = new ProjectRepository(),
  ) {
  }

  async exec(): Promise<Result<ScrumTeamEditQueryServiceDto, CustomError>> {
    const allEmployees = await this.employeeRepository.findAll()
    const employees = allEmployees.map(employee => ({
      id: employee.id.value!,
      fullName: employee.employeeName.getFullName(),
    }))

    const project = await this.projectRepository.fetch()

    if (!project) {
      return {
        data: null,
        error: {reason: ErrorReason.ProjectNotExists},
      }
    }

    try {
      const {id, scrumMaster, productOwner, developers} = await this.scrumTeamRepository.fetchOrFail()
      // presentation logic
      return {
        data: {
          scrumTeam: {
            id: id.value!,
            scrumMaster: {
              employeeId: scrumMaster.getId(),
              name: scrumMaster.getFullName(),
              isDeveloper: scrumMaster.isDeveloper(),
            },
            productOwner: {
              employeeId: productOwner.getId(),
              name: productOwner.getFullName(),
              isDeveloper: productOwner.isDeveloper(),
            },
            developers: developers.map(developer => ({
              employeeId: developer.getId(),
              name: developer.getFullName(),
            })),
          },
          employees,
          project: {name: project.name.value}
        },
        error: null,
      }
    } catch {
      return {
        data: {scrumTeam: null, employees, project: {name: project.name.value}},
        error: null,
      }
    }
  }
}
