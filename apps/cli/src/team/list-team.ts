import { ListScrumTeamQueryService, ListScrumTeamPresenter } from '@panda-project/use-case'
import { Command } from 'commander'

export const addListTeamCommand = (program: Command) => {
  program
    .command('list-team')
    .description('スクラムチームのメンバーを表示します')
    .action(async () => {
      try {
        const result = await new ListScrumTeamQueryService().exec()

        const output = new ListScrumTeamPresenter().exec(result)
        console.info(output)
      } catch (e: any) {
        console.error(e?.message)
      }
    })
}
