import {ID, Product, ProductRepositoryInterface} from "@panda-project/core";
import {Low} from "lowdb";
import {DataBase, db} from "@/cli/db";
import {AutoIncrementId} from "@/common";

export class ProductRepository implements ProductRepositoryInterface {
  constructor(private readonly lowdb: Low<DataBase> = db) {}

  async findById(id: ID) {
    await this.lowdb.read()
    const { products } = this.lowdb.data

    const product = products.find((product) => product.id === id.value)
    if (!product) {
      throw new Error(`Product not found. id: ${id.value}`)
    }

    return new Product(new ID(product.id), product.name)
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
      name: product.name,
    })

    await this.lowdb.write()
    return new Product(autoIncrementId, product.name)
  }
}
