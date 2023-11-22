'use server'

import {z} from "zod";
import {redirect} from "next/navigation";
import {
  CreateProductWebCommand,
  CreateProjectWebCommand,
  ProductUseCase,
  ProjectUseCase
} from "@panda-project/use-case";

export const createProductAndProject = async (prevState: any, formData: FormData) => {
  const validation = z.string()
    .min(1, "1文字以上入力してください")
    .max(30, "30文字以下で入力してください")
    .regex(/^[a-zA-Z0-9_-]*$/, '半角英数字と-_のみ使えます')
  const schema = z.object({
    productName: validation,
    projectName: validation,
  })

  const productName = formData.get('product-name')
  const projectName = formData.get('project-name')

  try {
    const parsed = schema.parse({productName, projectName})

    const createProductCommand = new CreateProductWebCommand(parsed.productName)
    await new ProductUseCase().create(createProductCommand)

    const createProjectCommand = new CreateProjectWebCommand(parsed.projectName)
    await new ProjectUseCase().create(createProjectCommand)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        errors: {
          ...err.formErrors.fieldErrors,
        }
      }
    }

    return {
      // TODO: エラー内容を書く
      errors: null
    }
  }

  redirect(`/employees`)
}
