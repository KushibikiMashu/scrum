import {
  Developer,
  EmployeeRepositoryInterface,
  ScrumMaster,
  ScrumTeam,
  ScrumTeamRepositoryInterface
} from "@panda-project/core";
import {EmployeeRepository, ScrumTeamRepository} from "@/gateway/repository/db";
import {CreateOrUpdateScrumTeamCommand, DisbandScrumTeamCommand} from "@/use-case/scrum-team";

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
      throw new Error('プロダクトオーナーはスクラムマスターを兼任できません')
    }

    const developerIds = command.getDeveloperIds()
    // 重複の有無をチェック
    const uniqueIds = new Set(developerIds.map(id => id.value))
    if (uniqueIds.size !== developerIds.length) {
      throw new Error('開発者が重複しています')
    }

    // プロダクトオーナー
    const productOwnerEmployee = await this.employeeRepository.findByIdOrFail(newProductOwnerId)
    const newProductOwner = ScrumMaster.createFromEmployee(productOwnerEmployee)
    // スクラムマスター
    const scrumMasterEmployee = await this.employeeRepository.findByIdOrFail(newScrumMasterId)
    const newScrumMaster = ScrumMaster.createFromEmployee(scrumMasterEmployee)
    // 開発者
    const developers = []
    for (const developerId of developerIds) {
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

  async disband(command: DisbandScrumTeamCommand) {
    const scrumTeamId = command.getScrumTeamId()
    const scrumTeam = await this.scrumTeamRepository.fetchOrFail()

    if (!scrumTeam.id.equals(scrumTeamId)) {
      throw new Error('削除しようとしているスクラムチームは存在しません')
    }

    await this.scrumTeamRepository.delete()
  }
}
