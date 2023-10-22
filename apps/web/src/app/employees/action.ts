'use server'

import {z} from "zod";
import {revalidatePath} from "next/cache";
import {CreateEmployeeCommand, EditEmployeeCommand, EmployeeUseCase} from "@panda-project/use-case";

export const createEmployee = async (_: any, formData: FormData) => {
  const schema = z.object({
    familyName: z.string().min(1, "1文字以上入力してください"),
    firstName: z.string().min(1, "1文字以上入力してください"),
  })

  try {
    const parsed = schema.parse({
      familyName: formData.get('family-name'),
      firstName: formData.get('first-name'),
    })

    const command = new CreateEmployeeCommand(parsed.familyName, parsed.firstName)
    await new EmployeeUseCase().create(command)
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

export const editEmployee = async (_: any, formData: FormData) => {
  const schema = z.object({
    employeeId: z.string(),
    familyName: z.string().min(1, "1文字以上入力してください"),
    firstName: z.string().min(1, "1文字以上入力してください"),
  })

  try {
    const parsed = schema.parse({
      employeeId: formData.get('employee-id'),
      familyName: formData.get('family-name'),
      firstName: formData.get('first-name'),
    })

    const command = new EditEmployeeCommand(Number.parseInt(parsed.employeeId, 10), parsed.familyName, parsed.firstName)
    await new EmployeeUseCase().edit(command)
    revalidatePath('/employees')
    return {message: '社員を編集しました', errors: null}
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
