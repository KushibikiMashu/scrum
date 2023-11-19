import Link from "next/link";
import {ScrumTeamEditQueryService, ScrumTeamEditQueryServiceDto} from "@panda-project/use-case";
import {TeamForm} from './form'
import {BreadcrumbContainer} from "~/components/layout/breadcrumb";

export default async function TeamEditPage() {
  const {data}: {data: ScrumTeamEditQueryServiceDto} = await new ScrumTeamEditQueryService().exec()

  if (data.employees.length < 3) {
    return <div>
      {/* TODO: スタイリングする */}
      チームを作成するためには、社員を3名以上登録してください。
      <Link href="/employees">社員を登録する</Link>
    </div>
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
      <BreadcrumbContainer
        items={[
          {name : 'スクラムチーム', path: '/team'},
        ]}
        current={{ name: 'チームを編集する' }}
      />
      <div className="mt-4">
        <TeamForm scrumTeam={data.scrumTeam} employees={data.employees} />
      </div>
    </div>
  )
}
