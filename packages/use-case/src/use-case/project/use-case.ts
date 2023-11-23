import {Id, Project, ProjectRepositoryInterface} from "@panda-project/core";
import {ProjectRepository} from "@/gateway/repository/json";
import {CreateProjectCommand} from "@/use-case/project";

export class ProjectUseCase {
  constructor(
    private readonly productRepository: ProjectRepositoryInterface = new ProjectRepository(),
  ) {
  }

  async create(command: CreateProjectCommand) {
    const product = new Project(Id.createAsNull(), command.getProjectName())
    return await this.productRepository.save(product)
  }
}
