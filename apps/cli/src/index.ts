import {Command} from "commander";
import {addInitCommand} from "~/init";
import {addEmployeeCreateCommand, addEmployeeEditCommand, addEmployeeRemoveCommand} from "~/employee";
import {addTeamCreateCommand, addTeamDisbandCommand, addTeamEditCommand, addTeamListCommand} from "~/team";
import {addDeveloperAddCommand, addDeveloperRemoveCommand} from "~/developer";

const program = new Command();

type AddCommand = (program: Command) => void
const commands: AddCommand[] = [
  addInitCommand,
  // employee
  addEmployeeCreateCommand,
  addEmployeeEditCommand,
  addEmployeeRemoveCommand,
  // team
  addTeamCreateCommand,
  addTeamListCommand,
  addTeamEditCommand,
  addTeamDisbandCommand,
  // developer
  addDeveloperAddCommand,
  addDeveloperRemoveCommand,

  // CLI での作成は満足したので、以下は GUI で作成する

  // TODO: プロダクトバックログを作る
  // TODO: アイテム追加する
    // 以下から選ぶ
      // epic, feature, story
    // アイテムを編集する
      // オプションでどの項目を編集するかを決められる
    // アイテムを epic -> feature など、置き換える

  // プランニング
  // TODO: プロダクトゴールをプロダクトバックログに追加する
  // task を作る
  // story を sprint backlog に持ってくる

  // TODO: スプリントを開始する
]

for (const command of commands) {
  command(program)
}

program.parse(process.argv);
