import {input, select} from "@inquirer/prompts";
import {Command} from "commander";
import {EmployeeCreateMultipleScenario, EmployeeCreateScenario, InitScenario} from "@panda-project/use-case";

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
        choices: names.map(v => ({
          name: `${v.id}: ${v.name}`,
          value: v.id,
        })),
      })
      const employee = await input({message: "訂正したい名前を入力してください"})
      return { employeeId, newEmployeeName: employee }
    }

    console.log(await useInput([{id: 1, name: 'Satoshi Tanaka'}, {id: 2, name: 'Taro Yamada'}]))
  });



// `employee remove`

// `team create` `team edit` `team remove`
// TODO: スクラムチームを結成する

// `team add developer` member から select する
// `team new po` POを設定 or 変更する
// `team new sm` スクラムマスターを設定 or 変更する
// TODO: スクラムチームに人を増やす


// TODO: プロダクトバックログを作る
// TODO: プロダクトゴールを作る
// TODO: スプリントを開始する

program.parse(process.argv);
