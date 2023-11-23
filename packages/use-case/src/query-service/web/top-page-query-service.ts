import {ProductRepositoryInterface} from "@panda-project/core";
import {ProductRepository} from "@/gateway/repository/json";
import {createDb, dbFileExists} from "@/external/db";
import {Result} from "./types";

type Dto = {
  productName: string | null
}

export class TopPageQueryService {
  constructor(
    private readonly productRepository: ProductRepositoryInterface = new ProductRepository(),
  ) {
  }

  async exec(): Promise<Result<Dto>> {
    // DB がない時は、DB + Product, Project を作成する
    const product = await this.productRepository.fetch()

    if (!dbFileExists()) {
      // DB を作成する
      await createDb()
    }

    if (product === null) {
      return {
        data: {productName: null},
        error: null,
      }
    }

    // Product, Project がある場合は、/:project に移動する
    return {
      data: {productName: product.name.value},
      error: null,
    }
  }
}
