import {input} from "@inquirer/prompts";
import {InitScenario} from "@panda-project/use-case";
import {Command} from "commander";

export const addInitCommand = (program: Command) => {
  program
    .command('init')
    .description('最初の設定をします')
    .action(async () => {
      const useInput = async () => {
        const product = await input({message: "開発するプロダクトの名前は？"})
        const project = await input({message: "プロジェクト名は？"})
        const employee = await input({message: "スクラムチームに参加する社員の名前は？（姓名は半角スペース区切り）"})
        return {product, project, employee}
      }

      console.info('最初の設定を開始します');
      try {
        await new InitScenario().exec(useInput)
        console.info('初期設定を完了しました');
      } catch (e: any) {
        console.error(e?.message)
      }
    });
}
