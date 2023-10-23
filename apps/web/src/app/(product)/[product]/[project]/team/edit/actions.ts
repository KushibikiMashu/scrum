'use server'

import {z} from "zod";

export const updateTeam = async (prevState: any, formData: FormData) => {
  const schema = z.object({
    productOwnerId: z.string(),
    scrumMasterId: z.string(),
    developerIds: z.array(z.string()).min(0).max(10),
  })

  try {
    const parsed = schema.parse({
      productOwnerId: formData.get('product-owner-id'),
      scrumMasterId: formData.get('scrum-master-id'),
      developerIds: formData.getAll('developers'),
    })

    console.log(parsed);

  } catch (e: unknown) {
    console.log(e);
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
