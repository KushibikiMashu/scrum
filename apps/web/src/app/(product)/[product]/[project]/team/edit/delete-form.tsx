'use client'

import {useFormState} from "react-dom";
import {deleteTeam} from "./actions";
import {ErrorMessage} from "~/components/common/error-message";
import {useEffect} from "react";
import {useToastDispatch} from "~/components/global/toast";

const initialState: {
  type: null | 'success' | 'error'
  errors: null | {
    teamId: string[]
  }
} = {
  type: null,
  errors: null,
}

type Props = {
  teamId: number
}

export default function DeleteForm({teamId}: Props) {
  const {showToast} = useToastDispatch()
  const [state, action] = useFormState(deleteTeam, initialState)

  const onSubmit = async (formData: FormData) => {
    const answer = confirm('本当にチームを解散しますか？')
    if (answer) {
      await action(formData)
    }
  }

  useEffect(() => {
    if (state.type === 'error') {
      showToast({
        icon: 'error',
        heading: state.errors,
      })
    }
  }, [state, showToast])

  return (
    <div className="mt-8">
      <form className="text-right" action={onSubmit}>
        <input type="hidden" name="team-id" value={teamId} required/>
        <button
          className="text-xs bg-red-500 text-white border border-red-300 hover:bg-red-600 rounded-md px-3 py-2"
          type="submit"
        >
          チームを削除する
        </button>
      </form>

      <ErrorMessage messages={state.errors?.teamId}/>
      <ErrorMessage messages={state.errors}/>
    </div>
  )
}
