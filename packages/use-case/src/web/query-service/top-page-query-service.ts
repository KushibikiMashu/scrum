import {ProductRepositoryInterface} from "@panda-project/core";
import {ProductRepository} from "@/gateway";

export type TopPageQueryServiceDto = {
  existsProduct: boolean
}

export class TopPageQueryService {
  constructor(
    private readonly productRepository: ProductRepositoryInterface = new ProductRepository(),
  ) {
  }

  async exec(): Promise<TopPageQueryServiceDto> {
    try {
      const existsProduct = await this.productRepository.existsWithoutId()

      return {
        existsProduct,
      }
    } catch (e) {
      throw new Error('Productが存在しません')
    }
  }
}
