import {ScrumTeamRepositoryInterface} from "@panda-project/core";
import {ScrumTeamRepository} from "@/gateway/repository/db";

export type RemoveDeveloperQueryServiceDto = {
  developers: {id: number; name: string}[]
}

export class RemoveDeveloperQueryService {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
  ) {
  }

  async exec(): Promise<RemoveDeveloperQueryServiceDto> {
    const scrumTeam = await this.scrumTeamRepository.fetchOrFail()
    const developers = scrumTeam.developers.map((developer) => ({
      id: developer.getId(),
      name: developer.getFullName(),
    }))

    return {developers}
  }
}
