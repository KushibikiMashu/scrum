import {ID, Product, ProductName, ProductRepositoryInterface} from "@panda-project/core";
import {ProductRepository} from "@/gateway/repository/db";

export interface CreateProductCommand {
  getProductName(): ProductName;
}

export class ProductUseCase {
  constructor(
    private readonly productRepository: ProductRepositoryInterface = new ProductRepository(),
  ) {
  }

  async create(command: CreateProductCommand) {
    const product = new Product(ID.createAsNull(), command.getProductName())
    return await this.productRepository.save(product)
  }
}
