import { CheckDbMiddleware, ListScrumTeamQueryService } from '@panda-project/use-case'
import { Command } from 'commander'

import { ListScrumTeamPresenter } from '@/query-service'

export const addListTeamCommand = (program: Command) => {
  program
    .command('list-team')
    .description('スクラムチームのメンバーを表示します')
    .action(async () => {
      try {
        const result = await new CheckDbMiddleware(async () => await new ListScrumTeamQueryService().exec()).run()

        const output = new ListScrumTeamPresenter().exec(result)
        console.info(output)
      } catch (e: any) {
        console.error(e?.message)
      }
    })
}
