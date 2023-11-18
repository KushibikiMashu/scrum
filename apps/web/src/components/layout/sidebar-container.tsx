'use server'

import Sidebar from "~/components/layout/sidebar";
import {SideBarQueryService} from "@panda-project/use-case";

export default async function SidebarContainer() {
  const {data} = await new SideBarQueryService().exec()

  if (!data) {
    return <div>sidebar を表示できません</div>
  }

  return <Sidebar {...data} />
}
