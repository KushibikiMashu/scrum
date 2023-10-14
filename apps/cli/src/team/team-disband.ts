import {Command} from "commander";
import {confirm} from "@inquirer/prompts";
import {DisbandScrumTeamScenario} from "@panda-project/use-case";

export const addTeamDisbandCommand = (program: Command) => {
  program
    .command('team-disband')
    .description('スクラムチームを解散します')
    .action(async () => {
      const answer = await confirm({message: '本当にスクラムチームを解散しますか？'});
      if (answer) {
        try {
          await new DisbandScrumTeamScenario().exec()
        } catch (e: any) {
          console.error(e?.message)
        }
      }
    });
}
