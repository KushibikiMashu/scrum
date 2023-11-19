'use server'

import Sidebar from "~/components/layout/sidebar";
import {SidebarQueryService} from "@panda-project/use-case";

export default async function SidebarContainer() {
  const {data} = await new SidebarQueryService().exec()

  if (!data) {
    return <div>sidebar を表示できません</div>
  }

  return <Sidebar {...data} />
}
