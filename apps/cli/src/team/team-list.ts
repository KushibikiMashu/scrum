import {Command} from "commander";
import {ListScrumTeamScenario} from "@panda-project/use-case";
import {CheckDbMiddleware} from "@/cli/middleware/check-db-middleware";

export const addTeamListCommand = (program: Command) => {
  program
    .command('team-list')
    .description('スクラムチームのメンバーを表示します')
    .action(async () => {
      try {
        const result = await new CheckDbMiddleware(
          async () => await new ListScrumTeamScenario().exec()
        ).run()
        console.info(result);
      } catch (e: any) {
        console.error(e?.message)
      }
    });
}
