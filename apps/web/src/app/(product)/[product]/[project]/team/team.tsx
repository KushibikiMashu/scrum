import { ScrumTeamQueryServiceDto } from '@panda-project/use-case'

type Props = { scrumTeam: NonNullable<ScrumTeamQueryServiceDto['scrumTeam']> }

type Developer = Props['scrumTeam']['developers'][number]

export default function Team({ scrumTeam }: Props) {
  const isPoDeveloper = scrumTeam.developers.some(
    (developer: Developer) => developer.employeeId === scrumTeam.productOwner.employeeId
  )
  const isSmDeveloper = scrumTeam.developers.some(
    (developer: Developer) => developer.employeeId === scrumTeam.scrumMaster.employeeId
  )
  const filteredDevelopers = scrumTeam.developers.filter(
    (developer: Developer) =>
      developer.employeeId !== scrumTeam.productOwner.employeeId &&
      developer.employeeId !== scrumTeam.scrumMaster.employeeId
  )

  return (
    <ul role="list" className="divide-y divide-gray-100">
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm leading-6 text-gray-900">プロダクトオーナー{isPoDeveloper && ' / 開発者'}</p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">{scrumTeam.productOwner.name}</p>
        </div>
      </li>
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm leading-6 text-gray-900">スクラムマスター{isSmDeveloper && ' / 開発者'}</p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">{scrumTeam.scrumMaster.name}</p>
        </div>
      </li>

      {filteredDevelopers.map((developer: Developer, i: number) => (
        <li key={i} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm leading-6 text-gray-900">開発者</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{developer.name}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
