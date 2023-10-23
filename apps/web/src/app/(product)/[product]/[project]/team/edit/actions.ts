'use server'

import {z} from "zod";

export const updateTeam = async (prevState: any, formData: FormData) => {
  //    validation: PO, SM は必ず選択する
  //    validation: devs は 最低一人を追加する。空配列を渡せるようにはしない。
  const schema = z.object({
    productOwnerId: z.string(),
    scrumMasterId: z.string(),
  })

  try {
    const parsed = schema.parse({
      productOwnerId: formData.get('product-owner-id'),
      scrumMasterId: formData.get('scrum-master-id'),
    })

  } catch (e: unknown) {
    if (e instanceof z.ZodError) {
      return {
        message: '',
        errors: {
          ...e.formErrors.fieldErrors,
        }
      }
    }
  }
}
