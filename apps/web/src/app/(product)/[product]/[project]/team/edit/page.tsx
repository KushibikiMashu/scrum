import Link from "next/link";
import {ScrumTeamEditQueryService, ScrumTeamEditQueryServiceDto} from "@panda-project/use-case";
import {TeamForm} from './form'
import {BreadcrumbContainer} from "~/components/layout/breadcrumb";
import {UserIcon} from "@heroicons/react/20/solid";

function EmployeeEmpty() {
  return (
    <div className="max-w-md">
      <Link
        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        href="/employees"
      >
        <div className="text-center">
          <div className="flex justify-center">
            <UserIcon className="h-16 w-16 text-gray-700"/>
          </div>
          <h3 className="mt-2 text-sm font-semibold text-gray-800">チームを作成するためには、社員を3名以上登録してください。</h3>
          <p className="mt-1 text-sm text-gray-500">社員を登録する</p>
        </div>
      </Link>
    </div>
  )
}

export default async function TeamEditPage() {
  const {data}: { data: ScrumTeamEditQueryServiceDto } = await new ScrumTeamEditQueryService().exec()

  return (
    <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
      {data.employees.length < 2 ?
        <EmployeeEmpty/>
        : <>
          <BreadcrumbContainer
            items={[
              {name: 'スクラムチーム', path: '/team'},
            ]}
            current={{name: 'チームを編集する'}}
          />
          <div className="mt-4">
            <TeamForm scrumTeam={data.scrumTeam} employees={data.employees}/>
          </div>
        </>
      }
    </div>
  )
}
