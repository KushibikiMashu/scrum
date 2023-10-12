import {confirm, input, select} from "@inquirer/prompts";
import {Command} from "commander";
import {
  AddDeveloperCallbackArg, AddDeveloperScenario,
  CreateTeamCallbackArg, CreateTeamScenario, DisbandScrumTeamScenario,
  EmployeeCreateMultipleScenario,
  EmployeeCreateScenario, EmployeeEditCallbackArg,
  EmployeeEditScenarioScenario, EmployeeRemoveCallbackArg, EmployeeRemoveScenario,
  InitScenario, ReselectScrumMasterCallbackArg, ReselectScrumMasterScenario
} from "@panda-project/use-case";
import {ReselectProductOwnerCallbackArg, ReselectProductOwnerScenario} from "@/cli";

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

      await new EmployeeCreateScenario().exec(useInput)
    }
  })

// `employee edit`
program
  .command('employee-edit')
  .action(async () => {
    const useInput = async (names: EmployeeEditCallbackArg) => {
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

// `team create`
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

    await new CreateTeamScenario().exec(selectProductOwner, selectScrumMaster)
  });

// team-edit product owner を変更する
// team-edit scrum master を変更する
program
  .command('team-edit')
  .option('-po, --product-owner', 'プロダクトオーナーを変更する')
  .option('-sm, --scrum-master', 'スクラムマスターを変更する')
  .action(async (option) => {
    if (option.productOwner) {
      const selectProductOwner = async (names: ReselectProductOwnerCallbackArg) => {
        const employeeId = await select({
          message: "プロダクトオーナーを選択してください",
          choices: names.map((v: ReselectProductOwnerCallbackArg[number]) => ({name: `${v.id}: ${v.name}`, value: v.id})),
        })
        return { employeeId }
      }
      await new ReselectProductOwnerScenario().exec(selectProductOwner)
      return
    }

    if (option.scrumMaster) {
      const selectScrumMaster = async (names: ReselectScrumMasterCallbackArg) => {
        const employeeId = await select({
          message: "スクラムマスターを選択してください",
          choices: names.map((v: ReselectScrumMasterCallbackArg[number]) => ({name: `${v.id}: ${v.name}`, value: v.id})),
        })
        return { employeeId }
      }
      await new ReselectScrumMasterScenario().exec(selectScrumMaster)
      return
    }

    console.error('オプションを指定してください')
  });

// `team disband`
program
  .command('team-disband')
  .action(async () => {
    const answer = await confirm({ message: '本当にスクラムチームを解散しますか？' });
    if (answer) {
      await new DisbandScrumTeamScenario().exec()
    }
  });

// developer add。loop で複数 select + confirm で抜ける
program
  .command('developer-add')
  .action(async () => {
    const selectDeveloper = async (names: AddDeveloperCallbackArg) => {
      const employeeId = await select({
        message: "開発者を選択してください",
        choices: names.map((v: AddDeveloperCallbackArg[number]) => ({name: `${v.id}: ${v.name}`, value: v.id})),
      })
      return { employeeId }
    }
    const continueToSelect = async () => await confirm({ message: '他の開発者を追加しますか？' });

    await new AddDeveloperScenario().exec(selectDeveloper, continueToSelect)
  });

// developer remove


// TODO: プロダクトバックログを作る
// TODO: プロダクトゴールを作る
// TODO: スプリントを開始する

program.parse(process.argv);
