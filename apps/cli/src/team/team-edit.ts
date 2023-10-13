import {Command} from "commander";
import {
  ReselectProductOwnerCallbackArg,
  ReselectProductOwnerScenario,
  ReselectScrumMasterCallback,
  ReselectScrumMasterScenario
} from "@/cli";
import {select} from "@inquirer/prompts";

// team-edit product owner を変更する
// team-edit scrum master を変更する
export const addTeamEditCommand = (program: Command) => {
  program
    .command('team-edit')
    .description('スクラムチームのPOかSMを変更します。-po, --product-owner | -sm, --scrum-master')
    .option('-po, --product-owner', 'プロダクトオーナーを変更する')
    .option('-sm, --scrum-master', 'スクラムマスターを変更する')
    .action(async (option) => {
      if (!option.productOwner || !option.scrumMaster) {
        console.error('オプションを指定してください')
      }

      if (option.productOwner) {
        const selectProductOwner: ReselectProductOwnerCallbackArg = async (names) => {
          const employeeId = await select({
            message: "プロダクトオーナーを選択してください",
            choices: names.map((v) => ({name: `${v.id}: ${v.name}`, value: v.id})),
          })
          return {employeeId}
        }
        await new ReselectProductOwnerScenario().exec(selectProductOwner)
      }

      if (option.scrumMaster) {
        const selectScrumMaster: ReselectScrumMasterCallback = async (names) => {
          const employeeId = await select({
            message: "スクラムマスターを選択してください",
            choices: names.map((v) => ({name: `${v.id}: ${v.name}`, value: v.id})),
          })
          return {employeeId}
        }
        await new ReselectScrumMasterScenario().exec(selectScrumMaster)
      }
    });
}
