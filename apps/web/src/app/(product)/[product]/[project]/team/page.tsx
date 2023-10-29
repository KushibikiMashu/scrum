import {ScrumTeamQueryService} from "@panda-project/use-case";
import Link from "next/link";
import Team from "./team";
import Breadcrumb from "./breadcrumb";

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

  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <Breadcrumb />
            <div className="mt-4">
              <h1>スクラムチーム</h1>
              <div>
                いい感じのダッシュボードを作る
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
          <div className="text-right">
            <Link className="text-xs border border-gray-200 rounded-md px-3 py-2" href="./team/edit">チームを編集する</Link>
          </div>
          <div className="mt-4">
          <Team scrumTeam={scrumTeam} />
          </div>
        </div>
      </div>
    </div>
  )
}