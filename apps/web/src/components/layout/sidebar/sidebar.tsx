'use client'

import {Disclosure} from '@headlessui/react'
import {ChevronRightIcon,} from '@heroicons/react/20/solid'
import {
  ExclamationTriangleIcon,
  FolderIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import Link from "next/link";
import {useUnimplemented} from "~/hooks";
import {SidebarDto} from "@panda-project/use-case";
import {ResetDbForm} from "~/components/feature/reset-db-form";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

type Navigation = ({
  name: string
  href: string
  icon: any
  current: boolean,
} | {
  name: string
  icon: any
  current: boolean,
  children: ({
    name: string; href: string
  })[]
})[]

const createNavigation = ({productName, projectName}: SidebarDto): Navigation => {
  return [
    {
      name: projectName,
      icon: FolderIcon,
      current: false,
      children: [
        {name: 'スクラムチーム', href: `/${productName}/${projectName}/team`},
        {name: 'スプリントバックログ', href: `/${productName}/${projectName}/sprint-backlog`},
        {name: 'プロダクトバックログ', href: '#'},
      ],
    },
    {
      name: 'Sample Project',
      icon: FolderIcon,
      current: false,
      children: [
        {name: 'スクラムチーム', href: '#'},
        {name: 'スプリントバックログ', href: '#'},
        {name: 'プロダクトバックログ', href: '#'},
      ],
    },
    {name: '社員一覧', href: '/employees', icon: UsersIcon, current: false},
  ]
}

type Props = SidebarDto

export default function Sidebar({productName, projectName}: Props) {
  const onClick = useUnimplemented()
  const navigation = createNavigation({productName, projectName})

  return (
    <div className="flex w-[260px] flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
      <div className="flex h-16 shrink-0 items-center">
        <Link href={`/${productName}`}>{productName}</Link>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item, navIndex) => (
                <li key={item.name}>
                  {!('children' in item) ? (
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
                    <Disclosure as="div" defaultOpen={navIndex === 0}>
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
                                {/* 未実装のものと実装済みのリンクを区別する */}
                                {navIndex === 1 || subItem.name === 'プロダクトバックログ' ?
                                  <Disclosure.Button
                                    as="button"
                                    className={classNames(
                                      'current' in subItem && subItem.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                                      'block rounded-md py-2 pr-2 pl-9 text-xs leading-6 text-gray-700'
                                    )}
                                    onClick={onClick}
                                  >
                                    {subItem.name}
                                  </Disclosure.Button>
                                  :
                                  // 44px
                                  <Disclosure.Button
                                    as="div"
                                    className={classNames(
                                      'current' in subItem && subItem.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                                      'block rounded-md py-2 pr-2 pl-9 text-xs leading-6 text-gray-700'
                                    )}
                                  >
                                    <Link className="block" href={subItem.href}>
                                      {subItem.name}
                                    </Link>
                                  </Disclosure.Button>
                                }
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
                <ResetDbForm/>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
}
