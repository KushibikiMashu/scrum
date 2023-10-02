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

export interface Artifact {
  getCommitments(): Commitment[];
}

export const BasicItemStatus = {
  WIP: 'wip',
  NeedForHelpOfProductOwner: 'need_for_help_of_product_owner',
  ReadyForDevelop: 'ready_for_develop',
  Done: 'done',
} as const;
export type BasicItemStatusType = typeof BasicItemStatus[keyof typeof BasicItemStatus];

export class DefinitionOfDone implements Commitment {
  constructor(
    public readonly definition: string
  ) {}
}

export class ProductBacklogItem {
  constructor(
    public readonly id: number,
    public readonly status: BasicItemStatusType,
    public readonly item: UserStory
  ) {}

  canBeMovedToSprintBacklog(): boolean {
    return this.status === BasicItemStatus.ReadyForDevelop || this.status === BasicItemStatus.Done;
  }

  hasMetDefinitionOfDone(): boolean {
    return this.status === BasicItemStatus.Done;
  }

  meetsDefinitionOfDone(): Increment[] {
    // このメソッドの実装は、具体的なロジックに基づいています。
    return [];
  }
}

export const ProductBacklogItemSortOption = {
  AscByPriority: 'asc_by_priority',
  DescByPriority: 'desc_by_priority',
  AscByCreated: 'asc_by_created',
  DescByCreated: 'desc_by_created',
} as const;
export type ProductBacklogItemSortOptionType = typeof ProductBacklogItemSortOption[keyof typeof ProductBacklogItemSortOption];

export class ProductBacklog implements Artifact {
  constructor(
    public readonly id: number,
    public readonly items: ProductBacklogItem[]
  ) {}

  add(item: ProductBacklogItem): this {
    this.items.push(item);
    return this;
  }

  remove(item: ProductBacklogItem): this {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
    return this;
  }

  getProductBacklogItems(): ProductBacklogItem[] {
    return this.items;
  }

  getProductBacklogItem(id: number): ProductBacklogItem | undefined {
    return this.items.find(item => item.id === id);
  }

  sort(option: ProductBacklogItemSortOptionType): this {
    // このメソッドの実装は、具体的なソートロジックに基づいています。
    return this;
  }

  getCommitments(): Commitment[] {
    return [new ProductGoal('', ProductGoalStatus.WIP)];
  }
}

export class SprintGoal implements Commitment {
  constructor(
    public readonly goal: string
  ) {}
}

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
    return this;
  }

  getItems(): SprintBacklogItem[] {
    return this.items;
  }

  getCommitments(): Commitment[] {
    return [new SprintGoal('')];
  }
}

export const IncrementStatus = {
  Ongoing: 'ongoing',
  HasRegression: 'has_regression',
  Deployable: 'deployable',
  Available: 'available',
} as const;
export type IncrementStatusType = typeof IncrementStatus[keyof typeof IncrementStatus];

export class Increment implements Artifact {
  constructor(
    public readonly id: number,
    public readonly ProductBacklogId: number,
    public status: IncrementStatusType
  ) {}

  canDeploy(): boolean {
    return this.status !== IncrementStatus.HasRegression;
  }

  setDeployable(): this {
    this.status = IncrementStatus.Deployable;
    return this;
  }

  setAvailable(): this {
    this.status = IncrementStatus.Available;
    return this;
  }

  setHasRegression(): this {
    this.status = IncrementStatus.HasRegression;
    return this;
  }

  getCommitments(): Commitment[] {
    return [];
  }
}

export class BasicItem {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly status: BasicItemStatusType,
  ) {
  }
}

export interface UserStory {}
export interface ImplementableItem {}

export class Epic implements UserStory {
  constructor(
    public readonly item: BasicItem,
    public readonly definitionOfDone: DefinitionOfDone,
  ) {
  }
}

export class Feature implements UserStory {
  constructor(
    public readonly item: BasicItem,
    public readonly definitionOfDone: DefinitionOfDone,
  ) {
  }
}

export class Story implements UserStory, ImplementableItem {
  constructor(
    public readonly item: BasicItem,
    public readonly definitionOfDone: DefinitionOfDone,
  ) {
  }
}

export class Task implements ImplementableItem {
  constructor(
    public readonly item: BasicItem,
  ) {
  }
}
