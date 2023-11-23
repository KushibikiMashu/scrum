import { Commitment } from '@/scrum/product'

export * from './artifact'
export * from './increment'
export * from './product-backlog'
export * from './sprint-backlog'
export * from './user-story'

// TODO: scrum-event に移動させる
export class SprintGoal implements Commitment {
  constructor(public readonly goal: string) {}
}
