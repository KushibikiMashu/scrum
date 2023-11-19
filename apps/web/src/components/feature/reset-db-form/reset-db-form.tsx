'use client'

import {resetDbAction} from "./actions";
import {useFormState} from "react-dom";
import {redirect} from "next/navigation";
import {useToastDispatch} from "~/components/global/toast";

export function ResetDbForm() {
  const [state, action] = useFormState<{ message: string; success: boolean | null }>(resetDbAction, {
    message: '',
    success: null
  })
  const {showToast} = useToastDispatch()

  const handleSubmit = async () => {
    const answer = confirm('本当にDBをリセットしますか？')
    if (answer) {
      await action()
    }
  }

  if (state.success !== null) {
    showToast({icon: state.success ? 'success' : 'error', heading: state.message})
  }

  if (state.success) {
    redirect('/')
  }

  return (
    <form action={handleSubmit}>
      <button type="submit">DBをリセットする</button>
    </form>
  )
}
