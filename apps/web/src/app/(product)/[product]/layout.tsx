'use client'

import {Disclosure} from '@headlessui/react'
import {ChevronRightIcon, MagnifyingGlassIcon} from '@heroicons/react/20/solid'
import {
  ExclamationTriangleIcon,
  FolderIcon, UserIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import Link from "next/link";
import {ResetDbForm} from "./reset-db-form";

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
      <div className="flex w-[260px] flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <div className="flex h-16 shrink-0 items-center">
          <Link href="/scrum">Scrum</Link>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    {!item.children ? (
                      <Link
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 text-gray-700'
                        )}
                      >
                        <item.icon className="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true"/>
                        {item.name}
                      </Link>
                    ) : (
                      <Disclosure as="div" defaultOpen={item.name === 'Indie'}>
                        {({open}) => (
                          <>
                            <Disclosure.Button
                              className={classNames(
                                item.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                                'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 text-gray-700'
                              )}
                            >
                              <item.icon className="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true"/>
                              {item.name}
                              <ChevronRightIcon
                                className={classNames(
                                  open ? 'rotate-90 text-gray-500' : 'text-gray-400',
                                  'ml-auto h-5 w-5 shrink-0'
                                )}
                                aria-hidden="true"
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel as="ul" className="mt-1 px-2">
                              {item.children.map((subItem) => (
                                <li key={subItem.name}>
                                  {/* 44px */}
                                  <Disclosure.Button
                                    as="div"
                                    className={classNames(
                                      subItem.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                                      'block rounded-md py-2 pr-2 pl-9 text-xs leading-6 text-gray-700'
                                    )}
                                  >
                                    <Link href={subItem.href}>
                                      {subItem.name}
                                    </Link>
                                  </Disclosure.Button>
                                </li>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    )}
                  </li>
                ))}
                <li
                  className={'group flex gap-x-3 rounded-md p-2 text-xs leading-6 text-gray-700 hover:bg-gray-50'}
                >
                  <ExclamationTriangleIcon className="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true"/>
                  <ResetDbForm />
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div className="w-full">
        {/* Nav Bar */}
        <div
          className="flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <form className="flex flex-1" action="#" method="GET">
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-gray-900 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </div>
            </form>
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
