import {Id, Product, ProductName, ProductRepositoryInterface} from "@panda-project/core";
import {Low} from "lowdb";
import {DataBase, db} from "@/external/db";
import {AutoIncrementId} from "@/common";

export class ProductRepository implements ProductRepositoryInterface {
  constructor(private readonly lowdb: Low<DataBase> = db) {}

  async fetch(): Promise<Product|null> {
    await this.lowdb.read()
    const { products } = this.lowdb.data

    if (products.length === 0) {
      return null
    }

    const product = products[0]
    return new Product(new Id(product.id), new ProductName(product.name))
  }

  async findByNameOrFail(productName: ProductName) {
    await this.lowdb.read()
    const { products } = this.lowdb.data

    const product = products.find((product) => product.name === productName.value)
    if (!product) {
      throw new Error(`Product not found. product name: ${productName.value}`)
    }

    return new Product(new Id(product.id), productName)
  }

  async existsWithoutId() {
    await this.lowdb.read()
    const { products } = this.lowdb.data

    return products.length > 0
  }

  async save(product: Product) {
    await this.lowdb.read()
    const { products } = this.lowdb.data

    const autoIncrementId = AutoIncrementId.createFromRecords(products)
    products.push({
      id: autoIncrementId.value,
      name: product.name.value,
    })

    await this.lowdb.write()
    return new Product(autoIncrementId, product.name)
  }
}
