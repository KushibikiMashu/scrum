import {Command} from "commander";
import {
  CheckDbMiddleware,
  CreateScrumTeamCliCommand,
  EditScrumTeamQueryService, EditScrumTeamQueryServiceDto, EditScrumTeamQueryServiceInput, ScrumTeamUseCase
} from "@panda-project/use-case";
import {select} from "@inquirer/prompts";

type SelectProductOwner = (arg: EditScrumTeamQueryServiceDto['candidateEmployees']) => Promise<{newProductOwnerId: number}>
type SelectScrumMaster = (arg: EditScrumTeamQueryServiceDto['candidateEmployees']) => Promise<{newScrumMasterId: number}>

export const addCreateTeamCommand = (program: Command) => {
  program
    .command('create-team')
    .description('スクラムチームを作成します')
    .action(async () => {
      const selectProductOwner: SelectProductOwner = async (candidates) => {
        const newProductOwnerId = await select({
          message: "プロダクトオーナーを選択してください",
          choices: candidates.map((v) => ({name: `${v.id}: ${v.name}`, value: v.id})),
        })
        return { newProductOwnerId }
      }
      const selectScrumMaster: SelectScrumMaster = async (candidates) => {
        const newScrumMasterId = await select({
          message: "スクラムマスターを選択してください",
          choices: candidates.map((v) => ({name: `${v.id}: ${v.name}`, value: v.id})),
        })
        return { newScrumMasterId }
      }

      try {
        const {candidateEmployees: productOwnerCandidates} = await new EditScrumTeamQueryService().exec()
        const {newProductOwnerId} = await selectProductOwner(productOwnerCandidates)

        const input = new EditScrumTeamQueryServiceInput([newProductOwnerId])
        const {candidateEmployees: scrumMasterCandidates} = await new EditScrumTeamQueryService().exec(input)
        const {newScrumMasterId} = await selectScrumMaster(scrumMasterCandidates)

        const command = new CreateScrumTeamCliCommand(
          newProductOwnerId,
          newScrumMasterId,
        )
        await new CheckDbMiddleware(
          async () => await new ScrumTeamUseCase().create(command)
        ).run()
      } catch (e: any) {
        console.error(e?.message)
      }
    });
}
