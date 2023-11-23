import { Artifact, ImplementableItem, SprintGoal } from './index'

import { Commitment } from '@/scrum/product'

export class SprintBacklogItem {
  constructor(
    public readonly item: ImplementableItem,
    public readonly created: Date
  ) {}
}

export class SprintBacklog implements Artifact {
  constructor(
    public readonly id: number,
    public readonly items: SprintBacklogItem[]
  ) {}

  addItem(item: ImplementableItem): this {
    // このメソッドの実装は、具体的なロジックに基づいています。
    return this
  }

  getItems(): SprintBacklogItem[] {
    return this.items
  }

  getCommitments(): Commitment[] {
    return [new SprintGoal('')]
  }
}
