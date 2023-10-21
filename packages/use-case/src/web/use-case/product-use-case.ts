import {ProductName, ProductRepositoryInterface} from "@panda-project/core";
import {ProductRepository} from "@/gateway";

export class ProductUseCase {
  constructor(
    private readonly productRepository: ProductRepositoryInterface = new ProductRepository(),
  ) {
  }

  async get(productName: string) {
    return await this.productRepository.findByName(new ProductName(productName))
  }
}
