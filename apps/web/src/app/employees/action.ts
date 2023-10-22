'use server'

import {z} from "zod";
import {revalidatePath} from "next/cache";
import {createEmployeeState} from "~/app/employees/AddForm";

export const createEmployee = async (_: typeof createEmployeeState, formData: FormData) => {
  const schema = z.object({
    familyName: z.string().min(1, "1文字以上入力してください"),
    firstName: z.string().min(1, "1文字以上入力してください"),
  })

  try {
    const parsed = schema.parse({
      familyName: formData.get('family-name'),
      firstName: formData.get('first-name'),
    })

    // await new EmployeeUseCase().create(parsed.familyName, parsed.firstName)

    revalidatePath('/employees')
    return {message: '社員を作成しました', errors: null}
  } catch (e: unknown) {
    if (e instanceof z.ZodError) {
      return {
        message: '',
        errors: {
          ...e.formErrors.fieldErrors,
        }
      }
    }

    return {
      message: '',
      errors: null
    }
  }
}
