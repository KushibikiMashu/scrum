import {Command} from "commander";
import {AddDeveloperCallback, AddDeveloperScenario} from "@panda-project/use-case";
import {confirm, select} from "@inquirer/prompts";

// developer add。loop で複数 select + confirm で抜ける
export const addDeveloperAddCommand = (program: Command) => {
  program
    .command('developer-add')
    .description('社員をスクラムチームの開発者を追加します')
    .action(async () => {
      const selectDeveloper: AddDeveloperCallback = async (names) => {
        const employeeId = await select({
          message: "追加する開発者を選択してください",
          choices: names.map((v) => ({name: `${v.id}: ${v.name}`, value: v.id})),
        })
        return {employeeId}
      }
      const continueToSelect = async () => await confirm({message: '他の開発者を追加しますか？'});

      try {
        const result = await new AddDeveloperScenario().exec(selectDeveloper, continueToSelect)
        console.info(result)
      } catch (e) {
        console.error(e)
      }
    });
}
