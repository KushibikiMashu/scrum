import {EmployeeRepository, ScrumTeamRepository} from "@/gateway";
import {
  Developer,
  EmployeeRepositoryInterface,
  ScrumMaster,
  ScrumTeam,
  ScrumTeamRepositoryInterface
} from "@panda-project/core";
import {AutoIncrementId} from "@/common";

export class CreateOrUpdateScrumTeamCommand {
  constructor(
    public readonly productOwnerId: string,
    public readonly scrumMasterId: string,
    public readonly developerIds: string[],
  ) {
  }

  getProductOwnerId(): AutoIncrementId {
    return new AutoIncrementId(Number.parseInt(this.productOwnerId, 10))
  }

  getScrumMasterId(): AutoIncrementId {
    return new AutoIncrementId(Number.parseInt(this.scrumMasterId, 10))
  }

  getDeveloperIds(): AutoIncrementId[] {
    const ids = this.developerIds.filter(id => id !== '')
    return [...new Set(ids)]
      .map(id => new AutoIncrementId(Number.parseInt(id, 10)))
  }
}

export class ScrumTeamUseCase {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {
  }

  async createOrUpdate(command: CreateOrUpdateScrumTeamCommand) {
    const newProductOwnerId = command.getProductOwnerId()
    const newScrumMasterId = command.getScrumMasterId()
    if (newProductOwnerId.equals(newScrumMasterId)) {
      throw new Error('PO は SM を兼任できません')
    }

    // プロダクトオーナー
    const productOwnerEmployee = await this.employeeRepository.findByIdOrFail(newProductOwnerId)
    const newProductOwner = ScrumMaster.createFromEmployee(productOwnerEmployee)
    // スクラムマスター
    const scrumMasterEmployee = await this.employeeRepository.findByIdOrFail(newScrumMasterId)
    const newScrumMaster = ScrumMaster.createFromEmployee(scrumMasterEmployee)
    // 開発者
    const developers = []
    for (const developerId of command.getDeveloperIds()) {
      const developerEmployee = await this.employeeRepository.findByIdOrFail(developerId)
      const developer = Developer.createFromEmployee(developerEmployee)
      developers.push(developer)
    }

    // 更新
    const scrumTeamExists = await this.scrumTeamRepository.exists()
    if (scrumTeamExists) {
      const prevScrumTeam = await this.scrumTeamRepository.fetchOrFail()
      const newScrumTeam = prevScrumTeam
        .changeProductOwner(newProductOwner)
        .changeScrumMaster(newScrumMaster)
        .updateDevelopers(developers)
      await this.scrumTeamRepository.update(newScrumTeam)
      return
    }

    // 新規作成
    const newScrumTeam = ScrumTeam.createFromNewScrumTeam(
      newProductOwner,
      newScrumMaster,
      developers,
    )
    await this.scrumTeamRepository.save(newScrumTeam)
  }
}