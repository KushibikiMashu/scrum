import {EmployeeRepository, ScrumTeamRepository} from "@/gateway";
import {EmployeeRepositoryInterface, ScrumMaster, ScrumTeam, ScrumTeamRepositoryInterface} from "@panda-project/core";
import {AutoIncrementId} from "@/common";

class CreateOrUpdateScrumTeamCommand {
  constructor(
    public readonly productOwnerId: number,
    public readonly scrumMasterId: number,
    // public readonly developerIds: number[],
  ) {
  }

  getProductOwnerId(): AutoIncrementId {
    return new AutoIncrementId(this.productOwnerId)
  }

  getScrumMasterId(): AutoIncrementId {
    return new AutoIncrementId(this.scrumMasterId)
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
    if (newProductOwnerId === newScrumMasterId) {
      throw new Error('PO は SM を兼任できません')
    }

    // プロダクトオーナー
    const productOwnerEmployee = await this.employeeRepository.findByIdOrFail(newProductOwnerId)
    const newProductOwner = ScrumMaster.createFromEmployee(productOwnerEmployee)
    // スクラムマスター
    const scrumMasterEmployee = await this.employeeRepository.findByIdOrFail(newScrumMasterId)
    const newScrumMaster = ScrumMaster.createFromEmployee(scrumMasterEmployee)
    // 開発者

    const scrumTeamExists = await this.scrumTeamRepository.exists()

    // 更新
    if (scrumTeamExists) {
      const prevScrumTeam = await this.scrumTeamRepository.fetchOrFail()
      const newScrumTeam = prevScrumTeam
        .changeProductOwner(newProductOwner)
        .changeScrumMaster(newScrumMaster)
      // update devs
      await this.scrumTeamRepository.update(newScrumTeam)
      return
    }

    // 新規作成
    const newScrumTeam = ScrumTeam.createFromNewScrumTeam(
      newProductOwner,
      newScrumMaster,
      []
    )
    await this.scrumTeamRepository.save(newScrumTeam)
  }
}
