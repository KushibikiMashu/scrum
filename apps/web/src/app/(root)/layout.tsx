'use client'

import Sidebar from "~/components/layout/sidebar";

export default function Layout({children}) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full">
        {/* Nav Bar */}
        <div
          className="flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="ml-auto">
              <div
                className="flex py-5 text-sm font-semibold leading-6 text-gray-900"
              >
                <span className="sr-only">Your profile</span>
                <span className="w-full text-right" aria-hidden="true">Your Name</span>
              </div>
            </div>
          </div>
        </div>
        {/* Main */}
        <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
          {children}
        </div>
      </div>
    </div>
  )
}
