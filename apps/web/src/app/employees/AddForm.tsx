'use client'

import {createEmployee} from "./action";
import {useFormState, useFormStatus} from "react-dom";

export const createEmployeeState = {
  message: '',
  errors: null,
}

const SubmitButton = () => {
  const {pending} = useFormStatus()
  return <button type="submit" disabled={pending}>追加</button>
}

export function AddForm() {
  const [state, action] = useFormState(createEmployee, createEmployeeState)

  return <div>
    <form action={action}>
      <div>
      <label><input type="text" name="family-name"/></label>
      {state.errors?.familyName?.map((error: string, i: number) => (
        <p key={i}>{error}</p>
      ))}
      </div>
      <div>
      <label><input type="text" name="first-name"/></label>
      {state.errors?.firstName?.map((error: string, i: number) => (
        <p key={i}>{error}</p>
      ))}
      </div>
      <SubmitButton/>
    </form>
    {state.message !== '' && <p>{state.message}</p>}
  </div>
}
