import * as console from 'console'

import { confirm, select } from '@inquirer/prompts'
import {
  AddDeveloperCliCommand,
  AddDeveloperQueryService,
  AddDeveloperQueryServiceDto,
  CheckDbMiddleware,
  ScrumTeamUseCase,
} from '@panda-project/use-case'
import { Command } from 'commander'


type SelectDeveloper = (arg: AddDeveloperQueryServiceDto['candidateEmployees']) => Promise<{ developerId: number }>

// developer add。loop で複数 select + confirm で抜ける
export const addAddDeveloperCommand = (program: Command) => {
  program
    .command('add-developer')
    .description('スクラムチームの開発者を追加します')
    .action(async () => {
      const selectDeveloper: SelectDeveloper = async (candidates) => {
        const developerId = await select({
          message: '追加する開発者を選択してください',
          choices: candidates.map((v) => ({
            name: `${v.id}: ${v.name}`,
            value: v.id,
          })),
        })
        return { developerId }
      }
      const continueToSelect = async () => await confirm({ message: '他の開発者を追加しますか？' })

      try {
        // user input で loop を抜けるようにする
        for (let i = 0; i >= 0; i++) {
          if (i >= 1 && !(await continueToSelect())) {
            break
          }

          const { candidateEmployees } = await new AddDeveloperQueryService().exec()
          if (candidateEmployees.length === 0) {
            console.info('開発者としてスクラムチームに参加できる社員はもういません')
            break
          }

          const { developerId } = await selectDeveloper(candidateEmployees)
          const command = new AddDeveloperCliCommand(developerId)
          await new CheckDbMiddleware(async () => await new ScrumTeamUseCase().addDeveloper(command)).run()
        }

        // TODO: output を作る
        // console.info(result)
      } catch (e: any) {
        console.error(e?.message)
      }
    })
}
