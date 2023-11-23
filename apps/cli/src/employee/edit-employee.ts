import {Command} from "commander";
import {
  CheckDbMiddleware,
  EditEmployeeCliCommand,
  EditEmployeeQueryService,
  EditEmployeeQueryServiceDto,
  EmployeeUseCase
} from "@panda-project/use-case";
import {input, select} from "@inquirer/prompts";

type UserInput = (arg: EditEmployeeQueryServiceDto) => Promise<{employeeId: number, newEmployeeName: string}>

export const addEditEmployeeCommand = (program: Command) => {
  program
    .command('edit-employee')
    .description('社員の名前を変更します')
    .action(async () => {
      const userInput: UserInput = async (names) => {
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
        const employees = await new EditEmployeeQueryService().exec()
        const {employeeId, newEmployeeName} = await userInput(employees)
        const command = new EditEmployeeCliCommand(employeeId, newEmployeeName)
        await new CheckDbMiddleware(
          async () => await new EmployeeUseCase().edit(command)
        ).run()
      } catch (e: any) {
        console.error(e?.message)
      }
    });
}
