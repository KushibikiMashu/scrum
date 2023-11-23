import { UserIcon } from '@heroicons/react/24/outline'

export default function UserName() {
  return (
    <div className="flex text-sm leading-6 text-gray-900 space-x-2">
      <span className="sr-only">Your profile</span>
      <UserIcon className="h-6 w-6 shrink-0 text-gray-400" />
      <span aria-hidden="true">田中 太郎</span>
    </div>
  )
}
