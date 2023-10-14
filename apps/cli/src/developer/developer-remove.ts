import {RemoveDeveloperCallback, RemoveDeveloperScenario} from "@panda-project/use-case";
import {confirm, select} from "@inquirer/prompts";
import {Command} from "commander";

// developer remove. loop で複数 select + confirm で抜ける
export const addDeveloperRemoveCommand = (program: Command) => {
  program
    .command('developer-remove')
    .description('スクラムチームから開発者を除外します')
    .action(async () => {
      const selectDeveloper: RemoveDeveloperCallback = async (arg) => {
        const developerIndex = await select({
          message: "除外する開発者を選択してください",
          choices: arg.map((v) => ({name: `${v.index + 1}: ${v.name}`, value: v.index})),
        })
        return {developerIndex}
      }
      const continueToSelect = async () => await confirm({message: '他の開発者を除外しますか？'});

      try {
        const result = await new RemoveDeveloperScenario().exec(selectDeveloper, continueToSelect)
        if (result) console.info(result)
      } catch (e: any) {
        console.error(e?.message)
      }
    });
}
