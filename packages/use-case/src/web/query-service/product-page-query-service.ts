import {DefaultError, ErrorReason, Result} from "@/web/types";
import {
  Product, ProductName,
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
    name: Project['name']['value'],
  } | null
}

interface CustomError extends DefaultError {
  reason:
    | typeof ErrorReason.ProductNotExists
    | typeof ErrorReason.InvalidProductName
}

class Query {
  constructor(
    private readonly productName: string
  ) {
  }

  getProductName(): ProductName {
    return new ProductName(this.productName)
  }
}

export class ProductPageQueryService {
  constructor(
    private readonly productRepository: ProductRepositoryInterface = new ProductRepository(),
    private readonly projectRepository: ProjectRepositoryInterface = new ProjectRepository(),
  ) {
  }

  async exec(input: string): Promise<Result<Dto, CustomError>> {
    let productName = null
    try {
      productName = new Query(input).getProductName()
    } catch {
      return {
        data: null,
        error: {
          reason: ErrorReason.InvalidProductName,
        }
      }
    }

    const product = await this.productRepository.fetch()
    if (product === null || !product.name.equals(productName)) {
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
          name: project.name.value,
        }
      },
      error: null,
    }
  }
}
