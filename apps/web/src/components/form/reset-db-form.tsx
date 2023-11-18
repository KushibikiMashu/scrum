'use client'

import {resetDbAction} from "./actions";
import {useFormState} from "react-dom";
import {redirect} from "next/navigation";
import {useToastDispatch} from "~/components/global/use-toast";

export default function ResetDbForm() {
  const [state, action] = useFormState(resetDbAction, {message: ''})
  const {showToast} = useToastDispatch()

  const handleSubmit = async () => {
    const answer = confirm('本当にDBをリセットしますか？')
    if (answer) {
      await action()
      showToast({icon: 'success', heading: state.message})
      redirect('/')
    }
  }

  if (state.message) {
    showToast({icon: 'error', heading: state.message})
  }


  return (
    <form action={handleSubmit}>
      <button type="submit">DBをリセットする</button>
    </form>
  )
}
