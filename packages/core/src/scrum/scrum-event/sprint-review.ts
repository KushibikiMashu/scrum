import { ScrumEvent, ScrumEventType, ScrumEventTypeType } from './index'

import { Duration } from '@/common'
import { Member } from '@/company'

export class SprintReview implements ScrumEvent {
  constructor(
    public readonly id: number,
    public readonly place: string,
    public readonly timeBox: Duration,
    public readonly duration: Duration,
    public readonly stakeholders: Member[]
  ) {}

  getType(): ScrumEventTypeType {
    return ScrumEventType.SprintReview
  }

  getStartDate(): Date {
    return this.duration.start
  }

  getEndDate(): Date {
    return this.duration.end
  }
}
