import { confirm } from '@inquirer/prompts'
import {
  CheckDbMiddleware,
  ScrumTeamUseCase,
  DisbandScrumTeamQueryService,
  DisbandScrumTeamCliCommand,
} from '@panda-project/use-case'
import { Command } from 'commander'

export const addDisbandTeamCommand = (program: Command) => {
  program
    .command('disband-team')
    .description('スクラムチームを解散します')
    .action(async () => {
      const answer = await confirm({
        message: '本当にスクラムチームを解散しますか？',
      })
      if (answer) {
        try {
          const { scrumTeamId } = await new DisbandScrumTeamQueryService().exec()
          const command = new DisbandScrumTeamCliCommand(scrumTeamId)

          await new CheckDbMiddleware(async () => await new ScrumTeamUseCase().disband(command)).run()
        } catch (e: any) {
          console.error(e?.message)
        }
      }
    })
}
