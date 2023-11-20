'use client'

import {createProductAndProject} from "~/app/actions";
import {useFormState, useFormStatus} from "react-dom";
import {SubmitButton} from "~/components/common/submit-button";
import {ErrorMessage} from "~/components/common/error-message";

function Submit() {
  const {pending} = useFormStatus()

  return (
    <SubmitButton
      label="保存する"
      type="submit"
      pending={pending}
    />
  )
}

const initialState: {
  errors: {
    productName: string[];
    projectName: string[];
  } | null
} = {
  errors: null
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

          <ErrorMessage messages={state.errors?.productName} />
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

          <ErrorMessage messages={state.errors?.projectName} />
        </div>

        <div className="text-right">
          <Submit />
        </div>
      </form>
    </div>
  )
}
