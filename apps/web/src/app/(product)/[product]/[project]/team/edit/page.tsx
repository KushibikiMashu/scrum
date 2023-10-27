import Link from "next/link";
import {ScrumTeamEditQueryService, ScrumTeamEditQueryServiceDto} from "@panda-project/use-case";
import {TeamForm} from './form'
import Breadcrumb from "~/app/(product)/[product]/[project]/team/edit/breadcrumb";

// form は以下のものを作る
// - SM, PO, Devs を選択し、チームを作成する
//    updateScrumTeam（実質 upsert）
//    validation: PO, SM は必ず選択する
//    validation: devs は 最低一人を追加する。空配列を渡せるようにはしない。
//    developer を複数渡せるようにする（form で複数渡すのはどうしたらいいか調べる）

// [ ] スクラムチームがなければ、SM、PO だけでも同時に作成してもらう。片方のみの作成はできない
// [ ] 開発者は個別に追加してもらう（別の action を作る）

export default async function TeamEditPage() {
  const {data}: {data: ScrumTeamEditQueryServiceDto} = await new ScrumTeamEditQueryService().exec()

  if (data.employees.length < 3) {
    return <div>
      チームを作成するためには、社員を3名以上登録してください。
      <Link href="/employees">社員を登録する</Link>
    </div>
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
      <Breadcrumb projectName={data.project.name} />
      <div className="mt-4">
        <TeamForm scrumTeam={data.scrumTeam} employees={data.employees} />
      </div>
    </div>
  )
}
