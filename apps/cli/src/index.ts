import {input} from "@inquirer/prompts";
import {Command} from "commander";
import {InitScenario} from "@panda-project/use-case";

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

// `employee create` `employee edit` `employee remove`
// TODO: 社員を入力する
program
  .command('employee create')
  .action(async () => {
    console.info('社員を登録します')
    const employee = await input({message: "社員の名前は？（姓名は半角スペース区切り）"})

    try {
      console.info(employee)
    } catch (e: any) {
      console.error(e?.message)
    }
  })


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
