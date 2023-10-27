import {ChevronRightIcon} from '@heroicons/react/20/solid'

type Props = {
  projectName: string
}

// TODO: Breadcrumb は client コンポーネントで表示し、
// server component でデータを取得するようにする。ページからはデータ取得しない。

export default function Breadcrumb({projectName}: Props) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-1">
        <li>
          <div>
            <a href="../" className="text-gray-400 hover:text-gray-500 text-xs">
              <span>{projectName}</span>
            </a>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
            <a
              href="./"
              className="ml-1 text-xs font-medium text-gray-500 hover:text-gray-700"
            >
              スクラムチーム
            </a>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
            <span
              className="ml-1 text-xs font-medium text-gray-500"
            >
              チームを編集する
            </span>
          </div>
        </li>
      </ol>
    </nav>
  )
}
