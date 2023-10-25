import {ScrumTeamQueryService} from "@panda-project/use-case";
import Link from "next/link";

export default async function TeamPage() {
  const {data} = await new ScrumTeamQueryService().exec()

  if (data!.scrumTeam === null) {
    return <div>
      <Link href="./team/edit">
        スクラムチームを作成する
      </Link>
    </div>
  }

  const {scrumTeam} = data

  return <div>
    <h1>スクラムチーム</h1>
    <div>
      <p>プロダクトオーナー: <span>{scrumTeam.productOwner.name}</span></p>
      <p>スクラムマスター: <span>{scrumTeam.scrumMaster.name}</span></p>
      <p>開発者</p>
      <ul>
        {scrumTeam.developers.map((developer, i) =>
          <li key={i}>{developer.name}</li>
        )}
      </ul>
      <div>
        <Link href="./team/edit">チームを編集する</Link>
      </div>
      <div>
        <Link href="./">戻る</Link>
      </div>
    </div>
  </div>
}
