import {ID, Product, ProductName, ProductRepositoryInterface} from "@panda-project/core";
import {ProductRepository} from "@/gateway/repository/db";

export class ProductUseCase {
  constructor(
    private readonly productRepository: ProductRepositoryInterface = new ProductRepository(),
  ) {
  }

  async getByName(productName: string) {
    return await this.productRepository.findByNameOrFail(new ProductName(productName))
  }

  async create(productName: string) {
    const product = new Product(ID.createAsNull(), new ProductName(productName))
    return await this.productRepository.save(product)
  }
}
