'use server'

import { resetDb } from '@panda-project/use-case'

export const resetDbAction = async () => {
  try {
    await resetDb()
  } catch (e) {
    return { message: 'DBをリセットできませんでした', success: false }
  }

  return {
    message: 'DBをリセットしました',
    success: true,
  }
}
