import {input, select} from "@inquirer/prompts";
import {Command} from "commander";
import {
  CreateTeamCallbackArg, CreateTeamScenarioScenario,
  EmployeeCreateMultipleScenario,
  EmployeeCreateScenario,
  EmployeeEditScenarioScenario, EmployeeRemoveCallbackArg, EmployeeRemoveScenario,
  InitScenario
} from "@panda-project/use-case";

const program = new Command();

// hello
program
  .command('hello')
  .action(async () => {
    const answer = await input({message: "What is your name?"})
    console.log(answer);
  });

// init
program
  .command('init')
  .description('最初の設定を開始します')
  .action(async () => {
    const useInput = async () => {
      const product = await input({message: "開発するプロダクトの名前は？"})
      const project = await input({message: "プロジェクト名は？"})
      const employee = await input({message: "スクラムチームに参加する社員の名前は？（姓名は半角スペース区切り）"})
      return { product, project, employee }
    }

    await new InitScenario().exec(useInput)
  });

// `employee create`
program
  .command('employee-create')
  .option('-m, --multiple', '複数の社員を登録する')
  .action(async (_, options) => {
    if (options.multiple) {
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

      await new EmployeeCreateScenario().exec(useInput)
    }
  })

// `employee edit`
program
  .command('employee-edit')
  .action(async () => {
    const useInput = async (names: {id: number, name: string}[]) => {
      const employeeId = await select({
        message: "名前を編集する社員を選択してください",
        choices: names.map((v: {id: number, name: string}) => ({
          name: `${v.id}: ${v.name}`,
          value: v.id,
        })),
      })
      const employee = await input({message: "新しい名前を入力してください"})
      return { employeeId, newEmployeeName: employee }
    }

    await new EmployeeEditScenarioScenario().exec(useInput)
  });

// `employee remove`
program
  .command('employee-remove')
  .action(async () => {
    const useInput = async (names: EmployeeRemoveCallbackArg) => {
      const employeeId = await select({
        message: "削除する社員名を選択してください",
        choices: names.map((v: EmployeeRemoveCallbackArg[number]) => ({
          name: `${v.id}: ${v.name}`,
          value: v.id,
        })),
      })
      return { employeeId }
    }

    await new EmployeeRemoveScenario().exec(useInput)
  });

// TODO: スクラムチームを結成する
// `team create` `team edit` `team remove`
program
  .command('team-create')
  .action(async () => {
    const selectProductOwner = async (names: CreateTeamCallbackArg) => {
      const employeeId = await select({
        message: "プロダクトオーナーを選択してください",
        choices: names.map((v: CreateTeamCallbackArg[number]) => ({name: `${v.id}: ${v.name}`, value: v.id})),
      })
      return { employeeId }
    }
    const selectScrumMaster = async (names: CreateTeamCallbackArg) => {
      const employeeId = await select({
        message: "スクラムマスターを選択してください",
        choices: names.map((v: CreateTeamCallbackArg[number]) => ({name: `${v.id}: ${v.name}`, value: v.id})),
      })
      return { employeeId }
    }

    await new CreateTeamScenarioScenario().exec(selectProductOwner, selectScrumMaster)
  });


// `team add developer` member から select する
// `team new po` POを設定 or 変更する
// `team new sm` スクラムマスターを設定 or 変更する
// TODO: スクラムチームに人を増やす


// TODO: プロダクトバックログを作る
// TODO: プロダクトゴールを作る
// TODO: スプリントを開始する

program.parse(process.argv);
