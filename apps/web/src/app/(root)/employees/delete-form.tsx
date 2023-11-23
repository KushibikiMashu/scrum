import { classNames } from '~/utils'

type Props = {
  employeeId: number
  active: boolean
  onSubmit: (formData: FormData) => Promise<void>
}

export default function DeleteForm({ employeeId, active, onSubmit }: Props) {
  return (
    <form action={onSubmit}>
      <input type="hidden" name="employee-id" value={employeeId} required />
      <button
        type="submit"
        className={classNames(
          active ? 'bg-gray-50' : '',
          'w-full text-left block px-3 py-1 text-sm leading-6 text-gray-900'
        )}
      >
        削除する
      </button>
    </form>
  )
}
