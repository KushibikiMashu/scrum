'use server'

import { SidebarQueryService } from '@panda-project/use-case'

import Sidebar from './sidebar'

export async function SidebarContainer() {
  const { data } = await new SidebarQueryService().exec()

  if (!data) {
    return <div>sidebar を表示できません</div>
  }

  return <Sidebar {...data} />
}
