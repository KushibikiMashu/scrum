import { ProjectListQueryService } from '@panda-project/use-case'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'


export async function ProjectList() {
  const { data, error } = await new ProjectListQueryService().exec()

  if (error) {
    notFound()
  } else if (data === null || !data?.product || !data?.project) {
    redirect('/')
  } else if (!data?.scrumTeam) {
    redirect(`/${data.product.name}/${data.project.name}`)
  }

  return (
    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      {/* 定義したプロジェクト */}
      <li className="overflow-hidden rounded-xl border border-gray-200 transition-colors duration-100 hover:bg-gray-50">
        <Link href={`/${data.product.name}/${data.project.name}`}>
          <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 py-4 px-6">
            <div className="text-sm font-medium leading-6 text-gray-900">{data.project.name}</div>
          </div>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">プロダクトオーナー</dt>
              <dd className="flex items-start gap-x-2">
                <div className="font-medium text-gray-900">{data.scrumTeam.poName}</div>
              </dd>
            </div>
          </dl>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">スクラムマスター</dt>
              <dd className="flex items-start gap-x-2">
                <div className="font-medium text-gray-900">{data.scrumTeam.smName}</div>
              </dd>
            </div>
          </dl>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">開発者数</dt>
              <dd className="flex items-start gap-x-2">
                <div className="font-medium text-gray-900">{data.scrumTeam.developersCount}名</div>
              </dd>
            </div>
          </dl>
        </Link>
      </li>

      {/*　サンプル　*/}
      <li className="overflow-hidden rounded-xl border border-gray-200 hover:cursor-not-allowed">
        <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 py-4 px-6">
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
