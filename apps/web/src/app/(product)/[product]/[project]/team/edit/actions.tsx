'use server'

import {z} from "zod";
import {CreateOrUpdateScrumTeamCommand, ScrumTeamUseCase} from "@panda-project/use-case";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

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

    const command = new CreateOrUpdateScrumTeamCommand(
      parsed.productOwnerId,
      parsed.scrumMasterId,
      parsed.developerIds
    )
    await new ScrumTeamUseCase().createOrUpdate(command)
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
      errors: [e?.message],
    }
  }

  redirect('./')
}
