import { Commitment } from '@/scrum/product'
import { Artifact } from './index'

export const IncrementStatus = {
  Ongoing: 'ongoing',
  HasRegression: 'has_regression',
  Deployable: 'deployable',
  Available: 'available',
} as const
export type IncrementStatusType = (typeof IncrementStatus)[keyof typeof IncrementStatus]

export class Increment implements Artifact {
  constructor(
    public readonly id: number,
    public readonly ProductBacklogId: number,
    public status: IncrementStatusType
  ) {}

  canDeploy(): boolean {
    return this.status !== IncrementStatus.HasRegression
  }

  setDeployable(): this {
    this.status = IncrementStatus.Deployable
    return this
  }

  setAvailable(): this {
    this.status = IncrementStatus.Available
    return this
  }

  setHasRegression(): this {
    this.status = IncrementStatus.HasRegression
    return this
  }

  getCommitments(): Commitment[] {
    return []
  }
}
