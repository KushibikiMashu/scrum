'use server'

import {resetDb} from "@panda-project/use-case";

export const resetDbAction = async () => {
  await resetDb()
  return {
    message: 'DBをリセットしました',
  }
}
