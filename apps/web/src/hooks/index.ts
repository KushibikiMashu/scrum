import {useToastDispatch} from "~/components/global/toast";

// TODO: ファイルに切り出す
export function useUnimplemented() {
  const {showToast} = useToastDispatch()

  return () => {
    showToast({ icon: 'error', heading: 'Unimplemented', description: 'この機能は実装されていません' })
  }
}
