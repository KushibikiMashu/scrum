import {AutoIncrementId} from "@/common";

export interface CreateOrUpdateScrumTeamCommand {
  getProductOwnerId(): AutoIncrementId;
  getScrumMasterId(): AutoIncrementId;
  getDeveloperIds(): AutoIncrementId[];
}

export interface DisbandScrumTeamCommand {
  getScrumTeamId(): AutoIncrementId;
}
