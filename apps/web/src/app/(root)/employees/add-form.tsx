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
  return <button type="submit" disabled={pending}>登録する</button>
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

  return <div>
    <form action={handleSubmit}>
      <div>
        <label>
          <input
            type="text"
            name="family-name"
            required
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
          />
        </label>
        {state.errors?.familyName?.map((error: string, i: number) => (
          <p key={i}>{error}</p>
        ))}
      </div>
      <div>
        <label>
          <input
            type="text"
            name="first-name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        {state.errors?.firstName?.map((error: string, i: number) => (
          <p key={i}>{error}</p>
        ))}
      </div>
      <SubmitButton/>
    </form>
    {state.message !== '' && <p>{state.message}</p>}
  </div>
}
