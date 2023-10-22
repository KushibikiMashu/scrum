'use client'

import {createProductAndProject} from "~/app/actions";
import {useFormState, useFormStatus } from "react-dom";

const initialState = {
  productName: '',
  projectName: '',
  errors: null
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending} disabled={pending}>
      保存する
    </button>
  )
}

export function InitialForm() {
  const [state, formAction] = useFormState(createProductAndProject, initialState)

  return (
    <div>
      <form action={formAction}>
        <div>
          <label>プロダクト名</label>
          <input type="text" name="product-name" required />
          {state?.errors?.productName?.map((error: string, i: number) => (
            <p key={i}>{error}</p>
          ))}
        </div>

        <div>
          <label>プロジェクト名</label>
          <input type="text" name="project-name" required />
          {state?.errors?.projectName?.map((error: string, i: number) => (
            <p key={i}>{error}</p>
          ))}
        </div>

        <SubmitButton />
      </form>
    </div>
  )
}
