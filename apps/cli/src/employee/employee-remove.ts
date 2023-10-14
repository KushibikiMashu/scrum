import {Command} from "commander";
import {EmployeeRemoveCallback, EmployeeRemoveScenario} from "@panda-project/use-case";
import {select} from "@inquirer/prompts";

export const addEmployeeRemoveCommand = (program: Command) => {
  program
    .command('employee-remove')
    .description('社員を削除します')
    .action(async () => {
      const useInput: EmployeeRemoveCallback = async (names) => {
        const employeeId = await select({
          message: "削除する社員名を選択してください",
          choices: names.map((v) => ({
            name: `${v.id}: ${v.name}`,
            value: v.id,
          })),
        })
        return {employeeId}
      }

      try {
        const result = await new EmployeeRemoveScenario().exec(useInput)
          console.info(result);
      } catch (e: any) {
        console.error(e?.message)
      }
    });
}
