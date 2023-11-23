import { ScrumEvent, ScrumEventType, ScrumEventTypeType } from './index'
import { Duration } from '@/common'

export class SprintRetrospective implements ScrumEvent {
  constructor(
    public readonly id: number,
    public readonly place: string,
    public readonly timeBox: Duration,
    public readonly duration: Duration
  ) {}

  getType(): ScrumEventTypeType {
    return ScrumEventType.SprintRetrospective
  }

  getStartDate(): Date {
    return this.duration.start
  }

  getEndDate(): Date {
    return this.duration.end
  }
}
