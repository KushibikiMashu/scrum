'use server'

import {z} from "zod";
import {revalidatePath} from "next/cache";
import {
  CreateEmployeeWebCommand,
  DeleteEmployeeCommand,
  EditEmployeeCommand,
  EmployeeUseCase
} from "@panda-project/use-case";

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

    const command = new CreateEmployeeWebCommand(parsed.familyName, parsed.firstName)
    await new EmployeeUseCase().create(command)
    revalidatePath('/employees')
    return {errors: null}
  } catch (e: unknown) {
    if (e instanceof z.ZodError) {
      return {
        errors: {
          ...e.formErrors.fieldErrors,
        }
      }
    }

    return {
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
    return {errors: null}
  } catch (e: unknown) {
    if (e instanceof z.ZodError) {
      return {
        errors: {
          ...e.formErrors.fieldErrors,
        }
      }
    }

    return {
      errors: null
    }
  }
}

export const deleteEmployee = async (_: any, formData: FormData) => {
  const schema = z.object({
    employeeId: z.string(),
  })

  try {
    const parsed = schema.parse({
      employeeId: formData.get('employee-id'),
    })

    const command = new DeleteEmployeeCommand(Number.parseInt(parsed.employeeId, 10))
    await new EmployeeUseCase().delete(command)
    revalidatePath('/employees')
    return { type: 'success', errors: null }
  } catch (e) {
    return { type: 'error', errors: e instanceof Error ? e.message : null }
  }
}
