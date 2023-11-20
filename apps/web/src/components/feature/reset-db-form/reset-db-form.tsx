'use client'

import {resetDbAction} from "./actions";
import {useFormState} from "react-dom";
import {redirect} from "next/navigation";
import {useToastDispatch} from "~/components/global/toast";

const initialState: {
  message: string;
  success: boolean | null
} = {
  message: '',
  success: null
}

export function ResetDbForm() {
  const [state, action] = useFormState(resetDbAction, initialState)
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
