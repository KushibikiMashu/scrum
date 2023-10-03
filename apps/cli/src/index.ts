import {input} from "@inquirer/prompts";
import {Command} from "commander";
import {InitUseCase, InitInput} from "use-case/cli";

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
  .action(async () => {
    console.info('最初の設定を開始します');
    const product = await input({message: "開発するプロダクトの名前は？"})
    const project = await input({message: "プロジェクト名、またはチーム名は？"})
    // TODO: 社員名は複数入力できるようにする
    const employee = await input({message: "スクラムチームに参加する社員の名前は？（姓名はスペース区切り）"})

    // use-case, core の型ファイルを作成するようにする
    // パッケージ名をuse-caseではなく @xxx/use-case にする
    // new InitUseCase(
    //   new InitInput(product, project, employee)
    // ).exec()
  });

program.parse(process.argv);
