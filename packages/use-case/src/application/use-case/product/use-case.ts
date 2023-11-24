import { ProductId, Product, ProductRepositoryInterface } from '@panda-project/core'

import { CreateProductCommand } from './command'

import { ProductRepository } from '@/gateway/repository/json'

export class ProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface = new ProductRepository()) {}

  async create(command: CreateProductCommand) {
    const product = new Product(ProductId.createAsNull(), command.getProductName())
    return await this.productRepository.save(product)
  }

  async exists(): Promise<boolean> {
    return await this.productRepository.existsWithoutId()
  }
}
