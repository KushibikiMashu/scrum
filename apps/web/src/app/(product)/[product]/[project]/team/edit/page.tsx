import { UserIcon } from '@heroicons/react/20/solid'
import { ScrumTeamEditQueryService } from '@panda-project/use-case'
import Link from 'next/link'

import { BreadcrumbContainer } from '~/components/layout/breadcrumb'

import DeleteForm from './delete-form'
import { TeamForm } from './form'

function EmployeeEmpty() {
  return (
    <div className="max-w-md">
      <Link
        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        href="/employees"
      >
        <div className="text-center">
          <div className="flex justify-center">
            <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
          </div>
          <h3 className="mt-2 text-sm font-semibold text-gray-800">社員を登録する</h3>
          <p className="mt-1 text-sm text-gray-500">チームを作成するためには、社員を3名以上登録してください。</p>
        </div>
      </Link>
    </div>
  )
}

export default async function TeamEditPage() {
  const { data } = await new ScrumTeamEditQueryService().exec()

  if (data === null) {
    return <div>サーバーエラーです</div>
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
      <BreadcrumbContainer items={[{ name: 'スクラムチーム', path: '/team' }]} current={{ name: 'チームを編集する' }} />

      <div className="mt-4">
        {data.employees.length <= 2 ? (
          <EmployeeEmpty />
        ) : (
          <div className="max-w-xs">
            <TeamForm scrumTeam={data.scrumTeam} employees={data.employees} />

            <div className="mt-6">
              <div className="text-right">
                <Link
                  className="text-xs border border-gray-300 hover:bg-gray-50 rounded-md px-3 py-2"
                  href="/employees"
                >
                  社員を登録する
                </Link>
              </div>
            </div>

            {data.scrumTeam !== null && <DeleteForm teamId={data.scrumTeam.id} />}
          </div>
        )}
      </div>
    </div>
  )
}
