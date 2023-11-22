import {CreateProjectCommand} from "@/use-case";
import {ProjectName} from "@panda-project/core";

export class CreateProjectWebCommand implements CreateProjectCommand {
  constructor(
    private readonly projectName: string,
  ) {
  }

  getProjectName(): ProjectName {
    return new ProjectName(this.projectName)
  }
}
