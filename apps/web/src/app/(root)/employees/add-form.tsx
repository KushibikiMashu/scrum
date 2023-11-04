'use client'

import {createEmployee} from "./actions";
import {useFormState, useFormStatus} from "react-dom";
import {useState} from "react";

export const createEmployeeState = {
  message: '',
  errors: null,
}

const SubmitButton = () => {
  const {pending} = useFormStatus()
  return <button className="text-xs border border-gray-300 hover:bg-gray-50 rounded-md px-3 py-2" type="submit"
                 disabled={pending}>登録する</button>
}

export function AddForm() {
  const [state, action] = useFormState(createEmployee, createEmployeeState)
  // action 実行時に form を reset したいのだが、まだ正式な方法がないみたい...
  const [familyName, setFamilyName] = useState('')
  const [firstName, setFirstName] = useState('')
  const handleSubmit = async (data: FormData) => {
    await action(data)
    setFamilyName('')
    setFirstName('')
  }

  return (
    <div>
      <h2 className="text-base font-semibold leading-6 text-gray-600">社員を登録する</h2>
      <form action={handleSubmit}>
        <div className="mt-4 w-full lg:w-3/5">
          <div className="">
            <div className="">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                姓
                <input
                  type="text"
                  name="family-name"
                  required
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  autoComplete="first-name"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </label>

              {state.errors?.familyName?.map((error: string, i: number) => (
                <p key={i}>{error}</p>
              ))}
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
                  className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </label>

              {state.errors?.firstName?.map((error: string, i: number) => (
                <p key={i}>{error}</p>
              ))}
            </div>

            <div className="mt-4 text-right">
              <SubmitButton/>
            </div>
          </div>
        </div>
      </form>
      {state.message !== '' && <p>{state.message}</p>}
    </div>
  )
}
