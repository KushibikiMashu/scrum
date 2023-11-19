'use server'

import {z} from "zod";
import {redirect} from "next/navigation";
import {ProductUseCase, ProjectUseCase} from "@panda-project/use-case";

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
    await new ProjectUseCase().create(parsed.projectName)
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
      // TODO: エラー内容を書く
      errors: null
    }
  }

  redirect(`/employees`)
}
