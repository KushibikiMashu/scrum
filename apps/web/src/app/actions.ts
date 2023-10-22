'use server'

import {z} from "zod";
import {redirect} from "next/navigation";
import {ProductUseCase} from "@panda-project/use-case";

export const createProductAndProject = async (prevState: any, formData: FormData) => {
  const schema = z.object({
    productName: z.string().min(1, "1文字以上入力してください"),
    projectName: z.string().min(1, "1文字以上入力してください"),
  })

  const productName = formData.get('product-name')
  const projectName = formData.get('project-name')

  try {
    const parsed = schema.parse({productName, projectName})

    await new ProductUseCase().create(parsed.productName)
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
