import {input} from "@inquirer/prompts";
import {EmployeeCreateMultipleScenario, EmployeeCreateScenario} from "@panda-project/use-case";
import {Command} from "commander";

export const addEmployeeCreateCommand = (program: Command) => {
  program
    .command('employee-create')
    .description('社員を追加します。 -m, --multiple 複数の社員を追加します')
    .option('-m, --multiple', '複数の社員を登録する')
    .action(async (option) => {
      if (option.multiple) {
        const useInput = async () => {
          const employee = await input({message: "複数の社員の名前をカンマ区切りで入力してください（姓名は半角スペース区切り）"})
          return { employee }
        }

        await new EmployeeCreateMultipleScenario().exec(useInput)
      } else {
        const useInput = async () => {
          const employee = await input({message: "スクラムチームに参加する社員の名前は？（姓名は半角スペース区切り）"})
          return { employee }
        }

        try {
          const result = await new EmployeeCreateScenario().exec(useInput)
          console.info(result);
        } catch (e: any) {
          console.error(e?.message)
        }
      }
    })
}
