'use client'

import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import { ErrorMessage } from '~/components/common/error-message'
import { SubmitButton } from '~/components/common/submit-button'
import { useToastDispatch } from '~/components/global/toast'

import { createEmployee } from './actions'

export const createEmployeeState: {
  errors: {
    familyName: string[]
    firstName: string[]
  } | null
} = {
  errors: null,
}

const Submit = () => {
  const { pending } = useFormStatus()
  return <SubmitButton label="登録する" type="submit" pending={pending} />
}

export default function AddForm() {
  const { showToast } = useToastDispatch()

  const [state, action] = useFormState(createEmployee, createEmployeeState)
  // action 実行時に form を reset したいのだが、まだ正式な方法がないみたい...
  const [familyName, setFamilyName] = useState('')
  const [firstName, setFirstName] = useState('')
  const handleSubmit = async (data: FormData) => {
    await action(data)
    setFamilyName('')
    setFirstName('')

    showToast({
      icon: 'success',
      heading: '社員を登録しました',
    })
  }

  return (
    <div>
      <h2 className="text-base font-semibold leading-6 text-gray-600">社員を登録する</h2>
      <form action={handleSubmit}>
        <div className="mt-4">
          <div>
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                姓
                <input
                  type="text"
                  name="family-name"
                  required
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  autoComplete="first-name"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </label>

              <ErrorMessage messages={state.errors?.familyName} />
            </div>

            <div className="mt-2">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                名
                <input
                  type="text"
                  name="first-name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="family-name"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </label>

              <ErrorMessage messages={state.errors?.firstName} />
            </div>

            <div className="mt-4 text-right">
              <Submit />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
