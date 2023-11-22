import {Result} from "./types";
import {
  ProductRepositoryInterface,
  ProjectRepositoryInterface,
} from "@panda-project/core";
import {ProductRepository, ProjectRepository} from "@/gateway/repository/db";

export type BreadcrumbDto = {
  projectName: string
  productName: string
}

export class BreadcrumbQueryService {
  constructor(
    private readonly productRepository: ProductRepositoryInterface = new ProductRepository(),
    private readonly projectRepository: ProjectRepositoryInterface = new ProjectRepository(),
  ) {
  }

  async exec(): Promise<Result<BreadcrumbDto>> {
    // business logic
    const project = await this.projectRepository.fetch()
    if (project === null) {
      throw new Error('プロジェクトを取得できませんでした')
    }

    const product = await this.productRepository.fetch()
    if (product === null) {
      throw new Error('プロジェクトを取得できませんでした')
    }

    // presentation logic
    return {
      data: {
        projectName: project.name.value,
        productName: product.name.value,
      },
      error: null,
    }
  }
}
