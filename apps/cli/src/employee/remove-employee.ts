import {Command} from "commander";
import {
  CheckDbMiddleware,
  EmployeeUseCase,
  RemoveEmployeeCliCommand,
  RemoveEmployeeQueryService,
} from "@panda-project/use-case";
import {select} from "@inquirer/prompts";
import {RemoveEmployeeQueryServiceDto} from "@/query-service";

type UserInput = (arg: RemoveEmployeeQueryServiceDto) => Promise<{ employeeId: number }>

export const addRemoveEmployeeCommand = (program: Command) => {
  program
    .command('remove-employee')
    .description('社員を削除します')
    .action(async () => {
      const userInput: UserInput = async (employees) => {
        const employeeId = await select({
          message: "削除する社員名を選択してください",
          choices: employees.map((v) => ({
            name: `${v.id}: ${v.name}`,
            value: v.id,
          })),
        })
        return {employeeId}
      }

      try {
        const employees = await new RemoveEmployeeQueryService().exec()
        const {employeeId} = await userInput(employees)
        const command = new RemoveEmployeeCliCommand(employeeId)
        await new CheckDbMiddleware(
          async () =>
            await new EmployeeUseCase().remove(command)
        ).run()

        // TODO: output port & presenter を作る
        const output = `社員ID ${employeeId} を削除しました`
        console.info(output);
      } catch (e: any) {
        console.error(e?.message)
      }
    });
}
