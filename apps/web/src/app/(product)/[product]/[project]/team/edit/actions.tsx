'use server'

import {z} from "zod";
import {CreateOrUpdateScrumTeamCommand, DisbandScrumTeamCommand, ScrumTeamUseCase} from "@panda-project/use-case";
import {redirect} from "next/navigation";

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
        errors: {
          ...e.formErrors.fieldErrors,
        },
      }
    }

    return {
      errors: e instanceof Error ? [e.message] : [],
    }
  }

  redirect('./')
}

export const deleteTeam = async (prevState: any, formData: FormData) => {
  const schema = z.object({
    teamId: z.string(),
  })

  try {
    const parsed = schema.parse({
      teamId: formData.get('team-id'),
    })

    const command = new DisbandScrumTeamCommand(parsed.teamId)
    await new ScrumTeamUseCase().disband(command)
  } catch (e: unknown) {
    if (e instanceof z.ZodError) {
      return {
        errors: {
          type: 'error',
          ...e.formErrors.fieldErrors,
        },
      }
    }

    return {
      type: 'error',
      errors: e instanceof Error ? [e.message] : [],
    }
  }
  redirect('./')
}
