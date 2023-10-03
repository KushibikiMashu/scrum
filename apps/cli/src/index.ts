import {input} from "@inquirer/prompts";
import {Command} from "commander";
import {InitInput, InitUseCaseFactory} from "@panda-project/use-case";

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

    try {
      const useCase = new InitUseCaseFactory().create()
      useCase.exec(new InitInput(product, project, employee))
      console.info('初期設定を完了しました');
    } catch (e: any) {
      console.error(e?.message)
    }
  });

program.parse(process.argv);
