import Link from "next/link";
import {ScrumTeamEditQueryService, ScrumTeamEditQueryServiceDto} from "@panda-project/use-case";
import {TeamForm} from './form'
import Breadcrumb from "~/components/layout/breadcrumb";

type Props = {
  params: {
    product: string
    project: string
  }
}

export default async function TeamEditPage({params}: Props) {
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
      <Breadcrumb
        items={[
          {name : params.product, href: `/${params.product}`},
          {name : params.project, href: `/${params.product}/${params.project}`},
          {name : 'スクラムチーム', href: `/${params.product}/${params.project}/team`},
        ]}
        currentItem={{ name: 'チームを編集する' }}
      />
      <div className="mt-4">
        <TeamForm scrumTeam={data.scrumTeam} employees={data.employees} />
      </div>
    </div>
  )
}
