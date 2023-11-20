'use client'

import {createProductAndProject} from "~/app/actions";
import {useFormState, useFormStatus} from "react-dom";

const initialState = {
  productName: '',
  projectName: '',
  errors: null
}

function SubmitButton() {
  const {pending} = useFormStatus()

  return (
    <button
      className="text-xs border border-gray-300 hover:bg-gray-50 rounded-md px-3 py-2"
      type="submit"
      aria-disabled={pending}
      disabled={pending}
    >
      保存する
    </button>
  )
}

export function InitialForm() {
  const [state, action] = useFormState(createProductAndProject, initialState)

  return (
    <div>
      <div>
        <h1 className="text-lg font-semibold leading-6 text-gray-600">Scrum Management</h1>
        <p className="text-sm leading-6 text-gray-400">本ソフトウェアはスクラムチームのタスク管理ツール（デモ用）です</p>
      </div>
      <form action={action} className="mt-4 space-y-4">
        <div>
          <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
            プロダクト名（*半角英数字と-_のみ）
            <input
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              type="text"
              name="product-name"
              required
            />
          </label>

          {state?.errors?.productName?.map((error: string, i: number) => (
            <p key={i}>{error}</p>
          ))}
        </div>

        <div className="mt-2">
          <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
            プロジェクト名（*半角英数字と-_のみ）
            <input
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              type="text"
              name="project-name"
              required
            />
          </label>

          {state?.errors?.projectName?.map((error: string, i: number) => (
            <p key={i}>{error}</p>
          ))}
        </div>

        <div className="text-right">
          <SubmitButton/>
        </div>
      </form>
    </div>
  )
}
