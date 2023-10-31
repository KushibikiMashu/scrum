import {ChevronRightIcon} from '@heroicons/react/20/solid'
import Link from "next/link";

// TODO: Breadcrumb は client コンポーネントで表示し、
// server component でデータを取得するようにする。ページからはデータ取得しない。
// TODO: Breadcrumb は Layout で描画する
export function Breadcrumb() {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-1">
        <li>
          <div className="flex items-center">
            <Link href="/scrum" className="text-gray-400 hover:text-gray-500 text-xs">
              <span>Scrum</span>
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
            <Link href="/scrum/indie" className="text-gray-400 hover:text-gray-500 text-xs">
              <span
                className="ml-1 text-xs font-medium text-gray-400"
              >
                indie
              </span>
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
            <span
              className="ml-1 text-xs font-medium text-gray-500"
            >
              スプリントバックログ
            </span>
          </div>
        </li>
      </ol>
    </nav>
  )
}