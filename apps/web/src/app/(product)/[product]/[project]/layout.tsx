'use client'

import { Disclosure } from '@headlessui/react'
import {Bars3Icon, ChevronRightIcon, MagnifyingGlassIcon} from '@heroicons/react/20/solid'
import {
  FolderIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import Link from "next/link";

const navigation = [
  {
    name: 'Indie',
    icon: FolderIcon,
    current: false,
    children: [
      { name: 'スクラムチーム', href: '/scrum/indie/team' },
      { name: 'プロダクトバックログ', href: '#' },
      { name: 'スプリントバックログ', href: '#' },
    ],
  },
  {
    name: 'Sample Project',
    icon: FolderIcon,
    current: false,
    children: [
      { name: 'スクラムチーム', href: '#' },
      { name: 'プロダクトバックログ', href: '#' },
      { name: 'スプリントバックログ', href: '#' },
    ],
  },
  { name: '社員一覧', href: '/employees', icon: UsersIcon, current: false },
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
                    <a
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 text-gray-700'
                      )}
                    >
                      <item.icon className="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                      {item.name}
                    </a>
                  ) : (
                    <Disclosure as="div" defaultOpen={item.name === 'Indie'}>
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={classNames(
                              item.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                              'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 text-gray-700'
                            )}
                          >
                            <item.icon className="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
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
            </ul>
          </li>
        </ul>
      </nav>
    </div>
      <div className="w-full">
        <div className="flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
          <button type="button" className="-m-2.5 p-2.5 text-white xl:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-5 w-5" aria-hidden="true" />
          </button>

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
            <div className="lg:w-96">
              <div
                className="flex py-5 text-sm font-semibold leading-6 text-gray-900"
              >
                <span className="sr-only">Your profile</span>
                <span className="w-full text-right" aria-hidden="true">Your Name</span>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
