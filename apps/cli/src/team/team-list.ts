import {Command} from "commander";
import {ListScrumTeamScenario} from "@panda-project/use-case";

export const addTeamListCommand = (program: Command) => {
  program
    .command('team-list')
    .description('スクラムチームのメンバーを表示します')
    .action(async () => {
      await new ListScrumTeamScenario().exec()
    });
}
