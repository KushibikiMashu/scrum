'use server'

import SearchBar from '~/components/layout/search-bar'
import { SidebarContainer } from '~/components/layout/sidebar'
import UserName from '~/components/layout/user-name'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      {/* Left Menu */}
      <SidebarContainer />
      <div className="w-full">
        {/* Nav Bar */}
        <div className="flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <SearchBar />
            <div className="flex h-16 shrink-0 items-center justify-end lg:w-96">
              <UserName />
            </div>
          </div>
        </div>
        {/* Main */}
        {children}
      </div>
    </div>
  )
}
