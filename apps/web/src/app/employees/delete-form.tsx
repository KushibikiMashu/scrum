import {deleteEmployee} from "./actions";
import {useFormState} from "react-dom";

type Props = {
  employeeId: number
}

export function DeleteForm({employeeId}: Props) {
  const [_, action] = useFormState(deleteEmployee, {message: ''})
  const handleSubmit = async (formData: FormData) => {
    const answer = confirm('本当に削除しますか？')
    if (answer) {
      await action(formData)
    }
  }

  return <form action={handleSubmit}>
    <input type="hidden" name="employee-id" value={employeeId} required />
    <button type="submit">削除する</button>
  </form>
}
