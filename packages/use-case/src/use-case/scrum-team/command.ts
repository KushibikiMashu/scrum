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

export interface DisbandScrumTeamCommand {
  getScrumTeamId(): AutoIncrementId;
}
