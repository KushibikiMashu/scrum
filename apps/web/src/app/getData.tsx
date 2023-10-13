import {ListScrumTeamScenario} from "@panda-project/use-case";

export const getData = async () => {
  const scenario = new ListScrumTeamScenario()
  return await scenario.exec()
}
