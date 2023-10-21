import {DefaultError, ErrorReason, Result} from "@/web/types";
import {
  Product,
  ProductRepositoryInterface,
  Project,
  ProjectRepositoryInterface
} from "@panda-project/core";
import {ProductRepository, ProjectRepository} from "@/gateway";

type Dto = {
  product: {
    id: NonNullable<Product['id']['value']>,
    name: Product['name']['value'],
  },
  project: {
    id: NonNullable<Project['id']['value']>,
    name: Project['name'],
  } | null
}

interface CustomError extends DefaultError {
  reason: typeof ErrorReason.ProductNotExists
}

export class ProductPageQueryService {
  constructor(
    private readonly productRepository: ProductRepositoryInterface = new ProductRepository(),
    private readonly projectRepository: ProjectRepositoryInterface = new ProjectRepository(),
  ) {
  }

  async exec(): Promise<Result<Dto, CustomError>> {
    const product = await this.productRepository.fetch()
    if (product === null) {
      return {
        data: null,
        error: {
          reason: ErrorReason.ProductNotExists,
        }
      }
    }

    const project = await this.projectRepository.fetch()

    return {
      data: {
        product: {
          id: product.id.value,
          name: product.name.value,
        },
        project: project === null ? null : {
          id: project.id.value,
          name: project.name,
        }
      },
      error: null,
    }
  }
}
