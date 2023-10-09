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

export class Product {
  constructor(
    public readonly id: ID,
    public readonly name: string,
  ) {
  }
}

export interface ProductRepositoryInterface {
  save(product: Product): Promise<Product>
}
