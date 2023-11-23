import { ScrumTeamQueryService } from '@panda-project/use-case'

import { EmptyTeam } from '~/app/(product)/[product]/_common/empty-team'
import { BreadcrumbContainer } from '~/components/layout/breadcrumb'

import TaskList from '../_common/task-list'

export default async function SprintBacklogPage() {
  const { data } = await new ScrumTeamQueryService().exec()

  const today = new Date()
  const sprintStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4)
  const sprintEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3)
  const toYearMonthDay = (date: Date) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`

  const prevSprintStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 12)
  const prevSprintEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5)

  return (
    <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
      <BreadcrumbContainer current={{ name: 'スプリントバックログ' }} />

      {data!.scrumTeam === null ? (
        <div className="mt-4">{<EmptyTeam href="./team/edit" />}</div>
      ) : (
        <>
          <div className="mt-6">
            <div className="flex">
              <h3 className="text-base font-semibold leading-6 text-gray-600">スプリント8</h3>
              <span className="text-xs leading-6 text-gray-600">
                （{toYearMonthDay(sprintStart)} ~ {toYearMonthDay(sprintEnd)}）
              </span>
            </div>
          </div>
          <div className="mt-4">
            <TaskList />
          </div>

          <div className="mt-12">
            <div className="flex">
              <h3 className="text-base font-semibold leading-6 text-gray-600">スプリント7</h3>
              <span className="text-xs leading-6 text-gray-600">
                （{toYearMonthDay(prevSprintStart)} ~ {toYearMonthDay(prevSprintEnd)}）
              </span>
            </div>
          </div>
          <div className="mt-4">
            <TaskList />
          </div>
        </>
      )}
    </div>
  )
}
