import {UsersIcon} from "@heroicons/react/20/solid";
import Link from "next/link";

export function EmptyTeam() {
  return (
    <div className="max-w-md">
      <Link
        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        href="./team/edit"
      >
        <div>
          <UsersIcon className="mx-auto h-12 w-12 text-gray-400"/>
        </div>
        <span className="mt-2 block text-sm font-base text-gray-700">スクラムチームを作成する</span>
      </Link>
    </div>
  )
}
