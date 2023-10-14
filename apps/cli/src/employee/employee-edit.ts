import {Command} from "commander";
import {EmployeeEditCallback, EmployeeEditScenarioScenario} from "@panda-project/use-case";
import {input, select} from "@inquirer/prompts";

export const addEmployeeEditCommand = (program: Command) => {
  program
    .command('employee-edit')
    .description('社員の名前を変更します')
    .action(async () => {
      const useInput: EmployeeEditCallback = async (names) => {
        const employeeId = await select({
          message: "名前を変更する社員を選択してください",
          choices: names.map((v: { id: number, name: string }) => ({
            name: `${v.id}: ${v.name}`,
            value: v.id,
          })),
        })
        const employee = await input({message: "新しい名前を入力してください"})
        return {employeeId, newEmployeeName: employee}
      }

      try {
        const result = await new EmployeeEditScenarioScenario().exec(useInput)
        console.info(result);
      } catch (e: any) {
        console.error(e?.message)
      }
    });
}
