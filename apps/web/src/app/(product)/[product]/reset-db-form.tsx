'use client'

import {resetDbAction} from "./actions";
import {useFormState} from "react-dom";
import {redirect} from "next/navigation";

export function ResetDbForm() {
  const [_, action] = useFormState(resetDbAction, {})

  const handleSubmit = async () => {
    const answer = confirm('本当にDBをリセットしますか？')
    if (answer) {
      await action()
      redirect('/')
    }
  }

  return <form action={handleSubmit}>
    <button type="submit">DBをリセットする</button>
  </form>
}
