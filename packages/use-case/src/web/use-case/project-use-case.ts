import {ID, Project, ProjectName, ProjectRepositoryInterface} from "@panda-project/core";
import {ProjectRepository} from "@/gateway";

export class ProjectUseCase {
  constructor(
    private readonly productRepository: ProjectRepositoryInterface = new ProjectRepository(),
  ) {
  }

  async create(productName: string) {
    const product = new Project(ID.createAsNull(), new ProjectName(productName))
    return await this.productRepository.save(product)
  }
}
