import {input} from "@inquirer/prompts";
import {Command} from "commander";

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
    const product = await input({message: "開発するプロダクトの名前を入力してください"})
    const project = await input({message: "プロジェクト名、またはチーム名を入力してください"})
    // TODO: 社員名は複数入力できるようにする
    const employee = await input({message: "スクラムチームに参加する社員の名前を入力してください"})

    // use case を呼び出す
  });

program.parse(process.argv);
