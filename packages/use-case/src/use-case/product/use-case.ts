import { Id, Product, ProductName, ProductRepositoryInterface } from '@panda-project/core'
import { ProductRepository } from '@/gateway/repository/json'
import { CreateProductCommand } from './command'

export class ProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface = new ProductRepository()) {}

  async create(command: CreateProductCommand) {
    const product = new Product(Id.createAsNull(), command.getProductName())
    return await this.productRepository.save(product)
  }

  async exists(): Promise<boolean> {
    return await this.productRepository.existsWithoutId()
  }
}
