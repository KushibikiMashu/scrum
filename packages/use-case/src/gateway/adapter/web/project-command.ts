import { ProjectName } from '@panda-project/core'

import { CreateProjectCommand } from '@/use-case/project'

export class CreateProjectWebCommand implements CreateProjectCommand {
  constructor(private readonly projectName: string) {}

  getProjectName(): ProjectName {
    return new ProjectName(this.projectName)
  }
}
