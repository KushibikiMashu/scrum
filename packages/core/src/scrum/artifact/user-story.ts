import { DefinitionOfDone } from './index'

export const BasicItemStatus = {
  WIP: 'wip',
  NeedForHelpOfProductOwner: 'need_for_help_of_product_owner',
  ReadyForDevelop: 'ready_for_develop',
  Done: 'done',
} as const
export type BasicItemStatusType = (typeof BasicItemStatus)[keyof typeof BasicItemStatus]

export class BasicItem {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly status: BasicItemStatusType
  ) {}
}

export interface UserStory {}
export interface ImplementableItem {}

export class Epic implements UserStory {
  constructor(
    public readonly item: BasicItem,
    public readonly definitionOfDone: DefinitionOfDone
  ) {}
}

export class Feature implements UserStory {
  constructor(
    public readonly item: BasicItem,
    public readonly definitionOfDone: DefinitionOfDone
  ) {}
}

export class Story implements UserStory, ImplementableItem {
  constructor(
    public readonly item: BasicItem,
    public readonly definitionOfDone: DefinitionOfDone
  ) {}
}

export class Task implements ImplementableItem {
  constructor(public readonly item: BasicItem) {}
}
