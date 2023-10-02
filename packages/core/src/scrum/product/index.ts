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

// export class Product {
//   constructor(
//     public readonly name: string,
//     public readonly incrementSummary: IncrementSummary,
//     public readonly productBacklog: ProductBacklog,
//     public readonly goals: ProductGoal[],
//   ) {
//   }
// }

