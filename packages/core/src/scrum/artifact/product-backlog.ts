import { Commitment, ProductGoal, ProductGoalStatus } from '../product'
import { Artifact, BasicItemStatus, BasicItemStatusType, Increment, UserStory } from './index'

export class ProductBacklogItem {
  constructor(
    public readonly id: number,
    public readonly status: BasicItemStatusType,
    public readonly item: UserStory
  ) {}

  canBeMovedToSprintBacklog(): boolean {
    return this.status === BasicItemStatus.ReadyForDevelop || this.status === BasicItemStatus.Done
  }

  hasMetDefinitionOfDone(): boolean {
    return this.status === BasicItemStatus.Done
  }

  meetsDefinitionOfDone(): Increment[] {
    // このメソッドの実装は、具体的なロジックに基づいています。
    return []
  }
}

export const ProductBacklogItemSortOption = {
  AscByPriority: 'asc_by_priority',
  DescByPriority: 'desc_by_priority',
  AscByCreated: 'asc_by_created',
  DescByCreated: 'desc_by_created',
} as const
export type ProductBacklogItemSortOptionType =
  (typeof ProductBacklogItemSortOption)[keyof typeof ProductBacklogItemSortOption]

export class ProductBacklog implements Artifact {
  constructor(
    public readonly id: number,
    public readonly items: ProductBacklogItem[]
  ) {}

  add(item: ProductBacklogItem): this {
    this.items.push(item)
    return this
  }

  remove(item: ProductBacklogItem): this {
    const index = this.items.indexOf(item)
    if (index > -1) {
      this.items.splice(index, 1)
    }
    return this
  }

  getProductBacklogItems(): ProductBacklogItem[] {
    return this.items
  }

  getProductBacklogItem(id: number): ProductBacklogItem | undefined {
    return this.items.find((item) => item.id === id)
  }

  sort(option: ProductBacklogItemSortOptionType): this {
    // このメソッドの実装は、具体的なソートロジックに基づいています。
    return this
  }

  getCommitments(): Commitment[] {
    return [new ProductGoal('', ProductGoalStatus.WIP)]
  }
}
