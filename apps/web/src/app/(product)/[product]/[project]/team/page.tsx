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

  return <div>スクラムチームを表示する</div>
}
