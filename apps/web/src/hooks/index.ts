import {useToastDispatch} from "~/components/global/use-toast";

export function useUnimplemented() {
  const {showToast} = useToastDispatch()

  return () => {
    showToast({ icon: 'error', heading: 'Unimplemented', description: 'この機能は実装されていません' })
  }
}
