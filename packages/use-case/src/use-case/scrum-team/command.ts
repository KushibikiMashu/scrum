import {AutoIncrementId} from "@/common";

export interface CreateScrumTeamCommand {
  getProductOwnerId(): AutoIncrementId;
  getScrumMasterId(): AutoIncrementId;
  getDeveloperIds(): AutoIncrementId[];
}

export interface EditScrumTeamCommand {
  getProductOwnerId(): AutoIncrementId;
  getScrumMasterId(): AutoIncrementId;
  getDeveloperIds(): AutoIncrementId[];
}

export interface AddDeveloperCommand {
  getDeveloperId(): AutoIncrementId;
}

export interface DisbandScrumTeamCommand {
  getScrumTeamId(): AutoIncrementId;
}
