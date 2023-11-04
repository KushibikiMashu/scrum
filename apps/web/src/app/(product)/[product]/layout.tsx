'use client'

import {Disclosure} from '@headlessui/react'
import {ChevronRightIcon, MagnifyingGlassIcon} from '@heroicons/react/20/solid'
import {
  ExclamationTriangleIcon,
  FolderIcon, UserIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import Link from "next/link";
import ResetDbForm from "~/components/form/reset-db-form";
import SearchBar from "~/components/layout/search-bar";
import Sidebar from "~/components/layout/sidebar";

const navigation = [
  {
    name: 'Indie',
    icon: FolderIcon,
    current: false,
    children: [
      {name: 'スクラムチーム', href: '/scrum/indie/team'},
      {name: 'スプリントバックログ', href: '/scrum/indie/sprint-backlog'},
      {name: 'プロダクトバックログ', href: '#'},
    ],
  },
  {
    name: 'Sample Project',
    icon: FolderIcon,
    current: false,
    children: [
      {name: 'スクラムチーム', href: '/scrum/indie/team'},
      {name: 'スプリントバックログ', href: '/scrum/indie/sprint-backlog'},
      {name: 'プロダクトバックログ', href: '#'},
    ],
  },
  {name: '社員一覧', href: '/employees', icon: UsersIcon, current: false},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const MyLink = ({href, children}) => {
  return <Link href={href}>{children}</Link>
}

export default function Layout({children}) {
  return (
    <div className="flex">
      {/* Left Menu */}
      <Sidebar />
      <div className="w-full">
        {/* Nav Bar */}
        <div
          className="flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <SearchBar />
            <div className="flex h-16 shrink-0 items-center justify-end lg:w-96">
              <div
                className="flex text-sm leading-6 text-gray-900 space-x-2"
              >
                <span className="sr-only">Your profile</span>
                <UserIcon className="h-6 w-6 shrink-0 text-gray-400" />
                <span aria-hidden="true">田中 太郎</span>
              </div>
            </div>
          </div>
        </div>
        {/* Main */}
        {children}
      </div>
    </div>
  )
}
