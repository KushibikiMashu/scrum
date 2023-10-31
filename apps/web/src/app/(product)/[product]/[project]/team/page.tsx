import {ScrumTeamQueryService} from "@panda-project/use-case";
import Link from "next/link";
import Team from "./team";
import Breadcrumb from "./breadcrumb";

const stats = [
  { name: '消化済みポイント', stat: '11（61.1%）' },
  { name: 'キャパシティ', stat: '18' },
  { name: 'ベロシティ', stat: '17' },
]

function Stats() {
  const today = new Date()
  const sprintStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4)
  const sprintEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3)
  const toYearMonthDay = (date: Date) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  return (
    <div>
      <div className="flex">
        <h3 className="text-base font-semibold leading-6 text-gray-600">スプリント8</h3>
        <span className="text-sm leading-6 text-gray-600">（{toYearMonthDay(sprintStart)} ~ {toYearMonthDay(sprintEnd)}）</span>
      </div>
      <dl className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 border border-gray-300 sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-600">{item.stat}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

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
            <div className="mt-6">
              <Stats />
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
