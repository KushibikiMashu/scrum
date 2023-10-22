'use client'

import {useFormState, useFormStatus} from "react-dom";
import {useState} from "react";
import {editEmployee} from "~/app/employees/actions";

export const editEmployeeState = {
  message: '',
  errors: null,
}

const SubmitButton = () => {
  const {pending} = useFormStatus()
  return <button type="submit" disabled={pending}>保存する</button>
}

type Props = {
  employeeName: string
  employeeId: number
  onSave: () => void
  onCancel: () => void
}

export function EditForm({employeeName, employeeId, onSave, onCancel}: Props) {
  const [_familyName, ...rest] = employeeName.split(' ')
  const [state, action] = useFormState(editEmployee, editEmployeeState)
  // TODO: なぜか assertIsString が効かないので修正する
  const [familyName, setFamilyName] = useState(_familyName as string)
  const [firstName, setFirstName] = useState(rest.join(' ') as string)
  const handleSubmit = async (data: FormData) => {
    await action(data)
    setFamilyName('')
    setFirstName('')
    onSave()
  }

  return (
    <form action={handleSubmit}>
      <div>
        <input
          type="hidden"
          name="employee-id"
          readOnly
          value={employeeId}
        />
        <span>{employeeId}</span>
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

        <SubmitButton />
        <button type="button" onClick={onCancel}>キャンセルする</button>
      </div>
    </form>
  )
}
