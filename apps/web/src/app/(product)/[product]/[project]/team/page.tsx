import {ScrumTeamQueryService} from "@panda-project/use-case";
import Link from "next/link";
import Team from "./team";
import Stats from "./stats";
import TaskList from "../_common/task-list";
import {BreadcrumbContainer} from "~/components/layout/breadcrumb";
import {EmptyTeam} from "~/app/(product)/[product]/_common/empty-team";

export default async function TeamPage() {
  const {data} = await new ScrumTeamQueryService().exec()

  if (data!.scrumTeam === null) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
        <BreadcrumbContainer current={{name: 'スクラムチーム'}}/>
        <div className="mt-4">
          <EmptyTeam href="./team/edit" />
        </div>
      </div>
    )
  }

  const {scrumTeam} = data

  return (
    <div className="flex flex-col">
      <div className="mx-auto w-full max-w-7xl grow lg:flex">
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <BreadcrumbContainer current={{name: 'スクラムチーム'}}/>
            <div className="mt-6">
              <Stats/>
            </div>
            <div className="mt-8">
              <TaskList/>
            </div>
          </div>
        </div>

        {/* sidebar */}
        <div
          className="shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
          <div className="text-right">
            <Link className="text-xs border border-gray-300 hover:bg-gray-50 rounded-md px-3 py-2"
                  href="./team/edit">編集する</Link>
          </div>
          <div className="mt-4">
            <Team scrumTeam={scrumTeam}/>
          </div>
        </div>
      </div>
    </div>
  )
}
