import {Disclosure} from '@headlessui/react'
import {ChevronRightIcon, HomeIcon} from '@heroicons/react/20/solid'
import {
  ExclamationTriangleIcon,
  FolderIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import Link from "next/link";
import ResetDbForm from "~/components/form/reset-db-form";

function classNames(...classes) {
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

const navigation: Navigation = [
  {
    name: 'indie', // TODO: product name に応じて動的に取得する。プロジェクト名だけで良い
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
      {name: 'スクラムチーム', href: '#'},
      {name: 'スプリントバックログ', href: '#'},
      {name: 'プロダクトバックログ', href: '#'},
    ],
  },
  {name: '社員一覧', href: '/employees', icon: UsersIcon, current: false},
]

// TODO: async function にする？
// データフェッチを layout で行うか、sidebar で行うかの違い。
// sidebar で取得するようにしたい。可能な限り component と fetcher を 1対1 にする

export default function Sidebar() {
  return (
    <div className="flex w-[260px] flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
    <div className="flex h-16 shrink-0 items-center">
      {/* TODO: Product Name を動的に表示する */}
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
  )
}
