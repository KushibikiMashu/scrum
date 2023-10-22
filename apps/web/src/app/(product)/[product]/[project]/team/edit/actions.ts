'use server'

import {z} from "zod";

export const updateTeam = async (prevState: any, formData: FormData) => {
  //    validation: PO, SM は必ず選択する
  //    validation: devs は 最低一人を追加する。空配列を渡せるようにはしない。
  const schema = z.object({
    scrumMasterId: z.string(),
    productOwnerId: z.string(),
  })

  try {
    const parsed = schema.parse({
      scrumMasterId: formData.get('scrum-master-id'),
      productOwnerId: formData.get('product-owner-id'),
    })

    console.log('parsed', parsed);

    //
    // PO === SM なら、「SMはPOを兼任できません」というエラーメッセージを表示する

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
