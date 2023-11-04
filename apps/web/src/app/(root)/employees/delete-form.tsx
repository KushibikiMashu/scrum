import {deleteEmployee} from "./actions";
import {useFormState} from "react-dom";
import {useToastDispatch} from "~/components/global/use-toast";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  employeeId: number
  active: boolean
}

export default function DeleteForm({employeeId, active}: Props) {
  const {showToast} = useToastDispatch()

  const [_, action] = useFormState(deleteEmployee, {message: ''})
  const handleSubmit = async (formData: FormData) => {
    const answer = confirm('本当に削除しますか？')
    if (answer) {
      await action(formData)
      showToast({
        icon: 'success',
        heading: '社員を削除しました',
      })
    }
  }

  return <form action={handleSubmit}>
    <input type="hidden" name="employee-id" value={employeeId} required />
    <button
      type="submit"
      className={classNames(
        active ? 'bg-gray-50' : '',
        'w-full text-left block px-3 py-1 text-sm leading-6 text-gray-900'
      )}
    >削除する</button>
  </form>
}
