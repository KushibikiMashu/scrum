import {useFormState, useFormStatus} from "react-dom";
import {useState} from "react";
import {editEmployee} from "./actions";
import {useToastDispatch} from "~/components/global/use-toast";

export const editEmployeeState = {
  message: '',
  errors: null,
}

type Props = {
  employeeName: string
  employeeId: number
  onSave: () => void
  onCancel: () => void
}

function CancelButton({onCancel}: Pick<Props, 'onCancel'>) {
  return <button className="text-xs border border-gray-300 hover:bg-gray-50 rounded-md px-3 py-2" type="button"
                 onClick={onCancel}>取消</button>
}

function SubmitButton() {
  const {pending} = useFormStatus()
  return <button className="text-xs border border-gray-300 hover:bg-gray-50 rounded-md px-3 py-2" type="submit"
                 disabled={pending}>保存</button>
}

export default function EditForm({employeeName, employeeId, onSave, onCancel}: Props) {
  const {showToast} = useToastDispatch()

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
    showToast({
      icon: 'success',
      heading: '社員名を更新しました',
    })
  }

  return (
    <form action={handleSubmit} className="grow">
      <div className="flex items-center">
        <input
          type="hidden"
          name="employee-id"
          readOnly
          value={employeeId}
        />
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
                  className="block w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  autoComplete="first-name"
                  className="block w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </label>
              {state.errors?.firstName?.map((error: string, i: number) => (
                <p key={i}>{error}</p>
              ))}
            </div>
          </div>

          <div className="space-x-2 pl-2">
            <SubmitButton/>
            <CancelButton onCancel={onCancel}/>
          </div>
        </div>
      </div>
    </form>
  )
}
