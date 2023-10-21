import {ID} from "@/common";

export const ProductGoalStatus = {
  WIP: 'wip',
  Ongoing: 'ongoing',
  Done: 'done',
  Aborted: 'aborted',
} as const;
export type ProductGoalStatusType = typeof ProductGoalStatus[keyof typeof ProductGoalStatus];

export interface Commitment {}

export class ProductGoal implements Commitment {
  constructor(
    public readonly goal: string,
    public readonly status: ProductGoalStatusType
  ) {}
}

export class ProductName {
  constructor(
    public readonly value: string
  ) {
    this.validate()
  }

  equals(other: ProductName): boolean {
    return this.value === other.value
  }

  private validate() {
    if (this.value.length < 1) {
      throw new Error('1文字以上入力してください')
    }
  }
}

export class Product {
  constructor(
    public readonly id: ID,
    public readonly name: ProductName,
  ) {
  }
}

export interface ProductRepositoryInterface {
  fetch(): Promise<Product|null>
  findByNameOrFail(name: ProductName): Promise<Product>
  existsWithoutId(): Promise<boolean> // CLI でしか使わないメソッドかも
  save(product: Product): Promise<Product>
}
