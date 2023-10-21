'use server'

import {z} from "zod";
import {redirect} from "next/navigation";

export const createProductAndProject = async (prevState: any, formData: FormData) => {
  const schema = z.object({
    productName: z.string().min(1, "1文字以上入力してください"),
    projectName: z.string().min(1, "1文字以上入力してください"),
  })

  const productName = formData.get('product-name')
  const projectName = formData.get('project-name')

  try {
    schema.parse({productName, projectName})

    // InputObject
    // validate
    // 保存する

  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        productName,
        projectName,
        errors: {
          ...err.formErrors.fieldErrors,
        }
      }
    }

    return {
      productName,
      projectName,
      errors: null
    }
  }

  redirect(`/${productName}`)
}
