import { input } from '@inquirer/prompts'
import {
  CheckDbMiddleware,
  CreateMultipleEmployeeCliCommand,
  CreateEmployeeCliCommand,
  EmployeeUseCase,
} from '@panda-project/use-case'
import { Command } from 'commander'
import * as console from 'console'

export const addAddEmployeeCommand = (program: Command) => {
  program
    .command('add-employee')
    .description('社員を追加します。 -m, --multiple 複数の社員を追加します')
    .option('-m, --multiple', '複数の社員を登録する')
    .action(async (option) => {
      if (option.multiple) {
        const useInput = async () => {
          const employees = await input({
            message: '複数の社員の名前をカンマ区切りで入力してください（姓名は半角スペース区切り）',
          })
          return { employees }
        }

        try {
          const { employees } = await useInput()
          const command = new CreateMultipleEmployeeCliCommand(employees)
          await new CheckDbMiddleware(async () => await new EmployeeUseCase().createMultiple(command)).run()
          // TODO: 後から output adapter を使う形で実装する
          console.info(`社員を登録しました: 合計${employees.length}名`)
        } catch (e: any) {
          console.error(e?.message)
        }
      } else {
        const useInput = async () => {
          const name = await input({
            message: 'スクラムチームに参加する社員の名前は？（姓名は半角スペース区切り）',
          })
          return { name }
        }

        try {
          const { name } = await useInput()
          const command = new CreateEmployeeCliCommand(name)
          await new CheckDbMiddleware(async () => await new EmployeeUseCase().create(command)).run()
          // TODO: output portで対応する
          console.info(`社員を登録しました: ${name}`)
        } catch (e: any) {
          console.error(e?.message)
        }
      }
    })
}
