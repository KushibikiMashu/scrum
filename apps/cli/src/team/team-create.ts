import {Command} from "commander";
import {CheckDbMiddleware, CreateTeamCallback, CreateTeamScenario} from "@panda-project/use-case";
import {select} from "@inquirer/prompts";

export const addTeamCreateCommand = (program: Command) => {
  program
    .command('team-create')
    .description('スクラムチームを作成します。登録済みの社員が最低2人必要です')
    .action(async () => {
      const selectProductOwner: CreateTeamCallback = async (names) => {
        const employeeId = await select({
          message: "プロダクトオーナーを選択してください",
          choices: names.map((v) => ({name: `${v.id}: ${v.name}`, value: v.id})),
        })
        return { employeeId }
      }
      const selectScrumMaster: CreateTeamCallback = async (names) => {
        const employeeId = await select({
          message: "スクラムマスターを選択してください",
          choices: names.map((v) => ({name: `${v.id}: ${v.name}`, value: v.id})),
        })
        return { employeeId }
      }

      try {
        await new CheckDbMiddleware(
          async () =>
            await new CreateTeamScenario().exec(selectProductOwner, selectScrumMaster)
        ).run()
      } catch (e: any) {
        console.error(e?.message)
      }
    });
}
