'use client'

import React, {createContext, useCallback, useContext, useEffect, useReducer} from 'react'

// @see
// https://zenn.dev/takepepe/articles/context-custom-hooks
export type State = {
  show: boolean
  icon: 'success' | 'error'
  heading: string
  description?: string
}

const initialStateFactory = (initialState?: Partial<State>): State => ({
  show: false,
  icon: 'success',
  heading: '',
  ...initialState,
})

const ToastStateContext = createContext<State>(initialStateFactory())
const ToastDispatchContext = createContext<{
  showToast: (args: Omit<State, 'show'>) => void
  hideToast: () => void
}>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  showToast: () => {
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  hideToast: () => {
  },
})

// Toast コンポーネント で利用する
export const useToastState = () => {
  const ctx = useContext(ToastStateContext)

  if (typeof ctx === 'undefined') {
    throw new Error('useToastState must be within a ToastProviderContainer')
  }

  return ctx
}

// --------------------
// Toast の表示を制御する hook
//
// 利用例
// export const Example = () => {
//   const { showToast } = useToastDispatch();
//   const handleClick = () => {
//     showToast({ icon: 'success', heading: 'Success!', description: '成功しました！' })
//   };
//   return <button onClick={handleClick}>通知を表示する</button>;
// };
// --------------------
export const useToastDispatch = (): {
  showToast: (args: Omit<State, 'show'>) => void
  hideToast: () => void
} => {
  const ctx = useContext(ToastDispatchContext)

  if (typeof ctx === 'undefined') {
    throw new Error('useToastDispatch must be within a ToastProviderContainer')
  }

  return ctx
}

// --------------------
// reducer
// --------------------
type Action = ({ type: 'SHOW' } & Omit<State, 'show'>) | { type: 'HIDE' }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SHOW': {
      const {icon, heading, description} = action
      return {show: true, icon, heading, description}
    }
    case 'HIDE':
      return {...state, show: false}
    default:
      throw new Error('Toast action type is invalid at useToast.')
  }
}

// --------------------
// Toast Context
// --------------------
export const useToastCore = (initialState?: Partial<State>) => {
  const [state, dispatch] = useReducer(reducer, initialStateFactory(initialState))
  const showToast = useCallback((args: Omit<State, 'show'>) => {
    dispatch({type: 'SHOW', ...args})
  }, [])
  const hideToast = useCallback(() => {
    dispatch({type: 'HIDE'})
  }, [])

  useEffect(() => {
    if (!state.show) return

    const id = setTimeout(() => {
      hideToast()
    }, 3000)

    return () => {
      clearTimeout(id)
    }
  }, [state.show, hideToast])

  return {
    state,
    showToast,
    hideToast,
  } as const
}

type Props = {
  initialState?: Partial<State>
}

export default function ToastProviderContainer (props: Props) {
  const {state, showToast, hideToast} = useToastCore(props.initialState)

  return (
    <ToastStateContext.Provider value={{...state}}>
      <ToastDispatchContext.Provider value={{showToast, hideToast}}>{props.children}</ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  )
}
