import {DefaultError, ErrorReason, Result} from "@/web/types";
import {
  InvalidProductNameError, InvalidProjectNameError,
  Product,
  ProductName,
  ProductRepositoryInterface,
  Project, ProjectName,
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
  }
}

interface CustomError extends DefaultError {
  reason:
    | typeof ErrorReason.InvalidProductName
    | typeof ErrorReason.InvalidProjectName
    | typeof ErrorReason.ProductNotExists
    | typeof ErrorReason.ProjectNotExists
    | typeof ErrorReason.UnknownError
}

class Query {
  constructor(
    private readonly productName: string,
    public readonly projectName: string,
  ) {
  }

  getProductName(): ProductName {
    return new ProductName(this.productName)
  }

  getProjectName(): ProjectName {
    return new ProjectName(this.projectName)
  }
}

const resolveErrorReason = (e: unknown) => {
  // match 式が欲しい...
  if (e instanceof InvalidProductNameError) {
    return ErrorReason.InvalidProductName
  } else if (e instanceof InvalidProjectNameError) {
    return ErrorReason.InvalidProjectName
  }

  return ErrorReason.UnknownError
}

export class ProjectPageQueryService {
  constructor(
    private readonly productRepository: ProductRepositoryInterface = new ProductRepository(),
    private readonly projectRepository: ProjectRepositoryInterface = new ProjectRepository(),
  ) {
  }

  async exec(input: {product: string, project: string}): Promise<Result<Dto, CustomError>> {
    let productName = null, projectName = null
    try {
      const userInput = new Query(input.product, input.project)
      productName = userInput.getProductName()
      projectName = userInput.getProjectName()
    } catch (e: unknown) {
      const reason = resolveErrorReason(e)
      return {
        data: null,
        error: { reason }
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
    if (project === null || !project.name.equals(projectName)) {
      return {
        data: null,
        error: {
          reason: ErrorReason.ProjectNotExists,
        }
      }
    }

    return {
      data: {
        product: {
          id: product.id.value,
          name: product.name.value,
        },
        project: {
          id: project.id.value,
          name: project.name,
        }
      },
      error: null,
    }
  }
}
