import { UsersIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

type Props = {
  href: string
}

export function EmptyTeam({ href }: Props) {
  return (
    <div className="max-w-md">
      <Link
        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        href={href}
      >
        <div className="text-center">
          <div className="flex justify-center">
            <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
          </div>
          <h3 className="mt-2 text-sm font-semibold text-gray-800">スクラムチームを作成する</h3>
        </div>
      </Link>
    </div>
  )
}
