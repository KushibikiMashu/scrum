import {Result} from "@/web/types";
import {ScrumTeamRepositoryInterface} from "@panda-project/core";
import {ScrumTeamRepository} from "@/gateway";

type Dto = {
  scrumTeam: {
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
}

export class ScrumTeamQueryService {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
  ) {
  }

  async exec(): Promise<Result<Dto>> {
    // business logic
    const existsScrumTeam = await this.scrumTeamRepository.exists()
    if (!existsScrumTeam) {
      return {
        data: {scrumTeam: null},
        error: null,
      }
    }

    const {scrumMaster, productOwner, developers} = await this.scrumTeamRepository.fetchOrFail()

    // presentation logic
    return {
      data: {
        scrumTeam: {
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
        }
      },
      error: null,
    }
  }
}
