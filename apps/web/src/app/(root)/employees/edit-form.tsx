import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import { ErrorMessage } from '~/components/common/error-message'
import { SubmitButton } from '~/components/common/submit-button'
import { useToastDispatch } from '~/components/global/toast'

import { editEmployee } from './actions'

export const editEmployeeState = {
  errors: null,
}

type Props = {
  employeeName: string
  employeeId: number
  onSave: () => void
  onCancel: () => void
}

function Submit() {
  const { pending } = useFormStatus()
  return <SubmitButton label="保存" type="submit" pending={pending} />
}

function CancelButton({ onCancel }: Pick<Props, 'onCancel'>) {
  return <SubmitButton label="取消" type="button" onClick={onCancel} />
}

export default function EditForm({ employeeName, employeeId, onSave, onCancel }: Props) {
  const { showToast } = useToastDispatch()
  const [state, action] = useFormState(editEmployee, editEmployeeState)

  const [_familyName, ...rest] = employeeName.split(' ')
  const [familyName, setFamilyName] = useState(_familyName as string)
  const [firstName, setFirstName] = useState(rest.join(' ') as string)

  const handleSubmit = async (data: FormData) => {
    await action(data)
    setFamilyName('')
    setFirstName('')
    onSave()
    showToast({
      icon: 'success',
      heading: '社員名を更新しました',
    })
  }

  return (
    <form action={handleSubmit} className="grow">
      <div className="flex items-center">
        <input type="hidden" name="employee-id" readOnly value={employeeId} />
        <span className="text-sm leading-6 text-gray-900">{employeeId}: </span>

        <div className="flex items-center justify-between grow ml-2">
          <div className="flex space-x-2">
            <div>
              <label>
                <input
                  type="text"
                  name="family-name"
                  required
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  autoComplete="first-name"
                  className="block w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </label>

              <ErrorMessage messages={state.errors?.familyName} />
            </div>

            <div>
              <label>
                <input
                  type="text"
                  name="first-name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="first-name"
                  className="block w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </label>

              <ErrorMessage messages={state.errors?.firstName} />
            </div>
          </div>

          <div className="space-x-2 pl-2">
            <Submit />
            <CancelButton onCancel={onCancel} />
          </div>
        </div>
      </div>
    </form>
  )
}
