import Link from "next/link";

type Props = {
  projects: {
    name: string
    product: { name: string }
    scrumTeam: {
      poName: string
      smName: string
      developersCount: number
    }
  }[]
}

export function ProjectList({projects}: Props) {
  return (
    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      {projects.map((project, i) => (
        <li key={i} className="overflow-hidden rounded-xl border border-gray-200 transition-colors duration-100 hover:bg-gray-50">
          <Link href={`/${project.product.name}/${project.name}`}>
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
              <div className="text-sm font-medium leading-6 text-gray-900">{project.name}</div>
            </div>
            <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">プロダクトオーナー</dt>
                <dd className="flex items-start gap-x-2">
                  <div className="font-medium text-gray-900">{project.scrumTeam.poName}</div>
                </dd>
              </div>
            </dl>
            <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">スクラムマスター</dt>
                <dd className="flex items-start gap-x-2">
                  <div className="font-medium text-gray-900">{project.scrumTeam.smName}</div>
                </dd>
              </div>
            </dl>
            <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">開発者数</dt>
                <dd className="flex items-start gap-x-2">
                  <div className="font-medium text-gray-900">{project.scrumTeam.developersCount}名</div>
                </dd>
              </div>
            </dl>
          </Link>
        </li>
      ))}
      <li className="overflow-hidden rounded-xl border border-gray-200 hover:cursor-not-allowed">
        <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
          <div className="text-sm font-medium leading-6 text-gray-900">Sample Project</div>
        </div>
        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">プロダクトオーナー</dt>
            <dd className="flex items-start gap-x-2">
              <div className="font-medium text-gray-900">John Doe</div>
            </dd>
          </div>
        </dl>
        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">スクラムマスター</dt>
            <dd className="flex items-start gap-x-2">
              <div className="font-medium text-gray-900">Jane Doe</div>
            </dd>
          </div>
        </dl>
        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">開発者数</dt>
            <dd className="flex items-start gap-x-2">
              <div className="font-medium text-gray-900">7名</div>
            </dd>
          </div>
        </dl>
      </li>
    </ul>
  )
}
