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
    // TODO: 入力してもらう前にバリデーションするためには、シナリオを作るしかない？
    // 例: InitValidateUseCase -> input -> InitUseCase というシナリオになる？
    const product = await input({message: "開発するプロダクトの名前は？"})
    const project = await input({message: "プロジェクト名は？"})
    const employee = await input({message: "スクラムチームに参加する社員の名前は？（姓名は半角スペース区切り）"})

    try {
      const useCase = new InitUseCaseFactory().create()
      await useCase.exec(new InitInput(product, project, employee))
      console.info('初期設定を完了しました');
    } catch (e: any) {
      console.error(e?.message)
    }
  });

// `employee create` `employee edit` `employee remove`
// TODO: 社員を入力する

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
