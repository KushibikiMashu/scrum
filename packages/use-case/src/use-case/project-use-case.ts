import {ID, Project, ProjectName, ProjectRepositoryInterface} from "@panda-project/core";
import {ProjectRepository} from "@/gateway/repository/db";

export interface CreateProjectCommand {
  getProjectName(): ProjectName;
}

export class ProjectUseCase {
  constructor(
    private readonly productRepository: ProjectRepositoryInterface = new ProjectRepository(),
  ) {
  }

  async create(command: CreateProjectCommand) {
    const product = new Project(ID.createAsNull(), command.getProjectName())
    return await this.productRepository.save(product)
  }
}
