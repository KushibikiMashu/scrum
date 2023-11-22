import {ID, Product, ProductRepositoryInterface} from "@panda-project/core";
import {ProductRepository} from "@/gateway/repository/db";
import {CreateProductCommand} from "./command";

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