import {Command} from "commander";
import {
  CheckDbMiddleware, EditScrumTeamCliCommand, EditTeamQueryService, EditTeamQueryServiceDto,
  ReselectScrumMasterCallback,
  ReselectScrumMasterScenario, ScrumTeamUseCase
} from "@panda-project/use-case";
import {select} from "@inquirer/prompts";

type SelectProductOwner = (args: EditTeamQueryServiceDto['candidateEmployees']) => Promise<{newProductOwnerId: number}>

// team-edit product owner を変更する
// team-edit scrum master を変更する
export const addTeamEditCommand = (program: Command) => {
  program
    .command('team-edit')
    .description('スクラムチームのPOかSMを変更します。-po, --product-owner | -sm, --scrum-master')
    .option('-po, --product-owner', 'プロダクトオーナーを変更する')
    .option('-sm, --scrum-master', 'スクラムマスターを変更する')
    .action(async (option) => {
      if (option.productOwner) {
        const selectProductOwner: SelectProductOwner = async (candidates) => {
          const newProductOwnerId = await select({
            message: "プロダクトオーナーを選択してください",
            choices: candidates.map((v) => ({name: `${v.id}: ${v.name}`, value: v.id})),
          })
          return {newProductOwnerId}
        }
        try {
          const dto = await new EditTeamQueryService().exec()
          const {newProductOwnerId} = await selectProductOwner(dto.candidateEmployees)
          const command = new EditScrumTeamCliCommand(
            newProductOwnerId,
            dto.scumMasterId,
            dto.developerIds,
          )
          await new CheckDbMiddleware(
            async () => await new ScrumTeamUseCase().edit(command)
          ).run()
        } catch (e: any) {
          console.error(e?.message)
          return
        }
      }

      if (option.scrumMaster) {
        const selectScrumMaster: ReselectScrumMasterCallback = async (names) => {
          const employeeId = await select({
            message: "スクラムマスターを選択してください",
            choices: names.map((v) => ({name: `${v.id}: ${v.name}`, value: v.id})),
          })
          return {employeeId}
        }

        try {
          await new CheckDbMiddleware(
            async () =>
              await new ReselectScrumMasterScenario().exec(selectScrumMaster)
          ).run()
        } catch (e: any) {
          console.error(e?.message)
          return
        }

        return
      }

      console.error('オプションを指定してください')
    });
}
