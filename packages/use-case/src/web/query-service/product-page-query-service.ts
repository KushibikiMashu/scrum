import {ProductName, ProductRepositoryInterface, ProjectRepositoryInterface} from "@panda-project/core";
import {ProductRepository, ProjectRepository} from "@/gateway";

export type ProductPageQueryServiceDto = {
  product: {
    id: number
    name: string
  }
  project: {
    id: number
    name: string
  }
}

export class ProductPageQueryService {
  constructor(
    private readonly productRepository: ProductRepositoryInterface = new ProductRepository(),
    private readonly projectRepository: ProjectRepositoryInterface = new ProjectRepository(),
  ) {
  }

  async exec(productName: string): Promise<ProductPageQueryServiceDto> {
    try {
      const product = await this.productRepository.findByNameOrFail(new ProductName(productName))
      const project = await this.projectRepository.fetch()

      return {
        product: {
          id: product.id.value,
          name: product.name.value,
        },
        project: {
          id: project.id.value,
          name: project.name,
        },
      }
    } catch (e) {
      throw new Error('Product または  Projectが存在しません')
    }
  }
}
