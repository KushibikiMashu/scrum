import {input} from "@inquirer/prompts";
import {
  CheckDbMiddleware,
  EmployeeCreateMultipleScenario,
  EmployeeCreateScenario,
  EmployeeUseCase
} from "@panda-project/use-case";
import {Command} from "commander";
import {CreateEmployeeCliCommand} from "@/gateway/adapter/cli";

export const addEmployeeCreateCommand = (program: Command) => {
  program
    .command('employee-create')
    .description('社員を追加します。 -m, --multiple 複数の社員を追加します')
    .option('-m, --multiple', '複数の社員を登録する')
    .action(async (option) => {
      if (option.multiple) {
        const useInput = async () => {
          const employee = await input({message: "複数の社員の名前をカンマ区切りで入力してください（姓名は半角スペース区切り）"})
          return {employee}
        }

        await new EmployeeCreateMultipleScenario().exec(useInput)
      } else {
        const useInput = async () => {
          const name = await input({message: "スクラムチームに参加する社員の名前は？（姓名は半角スペース区切り）"})
          return {name}
        }

        try {
          const {name} = await useInput()
          const command = new CreateEmployeeCliCommand(name)
          await new CheckDbMiddleware(
            async () =>
              await new EmployeeUseCase().create(command)
          ).run()
          // TODO: output portで対応する
          console.info(`社員を登録しました: ${name}`);
        } catch (e: any) {
          console.error(e?.message)
        }
      }
    })
}
