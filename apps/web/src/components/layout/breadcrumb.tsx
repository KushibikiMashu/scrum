'use client'

import {ChevronRightIcon} from '@heroicons/react/20/solid'
import Link from "next/link";
import {usePathname} from "next/navigation";

type Props = {
  linkItems: LinkItem[]
  currentItem: CurrentItem
}

type LinkItem = {
  name: string
  href: string
}

type CurrentItem = {
  name: string
}

// const linkItems: LinkItem[] = [
//   {name: 'product name', href: '/[product name]'}, // params から取得する
//   {name: 'project name', href: '/[project name]'}, // params から取得する
//   {name: 'スクラムチーム', href: '/scrum/indie/team'}, // params から取得する
// ]
//

// TODO: Breadcrumb は client コンポーネントで表示し、
// server component でデータを取得するようにする。ページからはデータ取得しない。
// TODO: Breadcrumb は Layout で描画する
export default function Breadcrumb({linkItems, currentItem}: Props) {
  // params からある程度取得する
  // router から取得しても良い

  const path = usePathname()
  console.log(path);


  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-1">
        {linkItems.map((item, i) => (
          <li key={i}>
            <div className="flex items-center">
              {i > 0 && <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>}
              <Link href={item.href} className="text-gray-400 hover:text-gray-500 text-xs">
                <span>{item.name}</span>
              </Link>
            </div>
          </li>
        ))}
        <li>
          <div className="flex items-center">
            <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
            <span
              className="ml-1 text-xs font-medium text-gray-500"
            >
              {currentItem.name}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  )
}
