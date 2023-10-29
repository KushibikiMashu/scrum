import {DefaultError, ErrorReason, Result} from "@/web/types";
import {
  Product, ProductName,
  ProductRepositoryInterface,
  Project,
  ProjectRepositoryInterface, ScrumTeam, ScrumTeamRepositoryInterface
} from "@panda-project/core";
import {ProductRepository, ProjectRepository, ScrumTeamRepository} from "@/gateway";

export type ProductPageQueryServiceDto = {
  product: {
    id: NonNullable<Product['id']['value']>,
    name: Product['name']['value'],
  },
  project: {
    id: NonNullable<Project['id']['value']>,
    name: Project['name']['value'],
  } | null
  scrumTeam: {
    poName: ReturnType<ScrumTeam['productOwner']['getFullName']>
    smName: ReturnType<ScrumTeam['scrumMaster']['getFullName']>
    developersCount: number
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
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
  ) {
  }

  async exec(input: string): Promise<Result<ProductPageQueryServiceDto, CustomError>> {
    // validation
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

    // business logic
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

    try {
      const scrumTeam = await this.scrumTeamRepository.fetchOrFail()
      // presentation logic
      return {
        data: {
          product: {
            id: product.id.value,
            name: product.name.value,
          },
          project: project === null ? null : {
            id: project.id.value,
            name: project.name.value,
          },
          scrumTeam: {
            poName: scrumTeam.productOwner.getFullName(),
            smName: scrumTeam.scrumMaster.getFullName(),
            developersCount: scrumTeam.developers.length,
          }
        },
        error: null,
      }
    } catch {
      // throw するが 別段エラーというわけではない
      return {
        data: {
          product: {
            id: product.id.value,
            name: product.name.value,
          },
          project: project === null ? null : {
            id: project.id.value,
            name: project.name.value,
          },
          scrumTeam: null
        },
        error: null,
      }
    }
  }
}
