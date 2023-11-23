import { ScrumEvent, ScrumEventType, ScrumEventTypeType } from './scrum-event'

import { Duration } from '@/common'

export class DailyScrum implements ScrumEvent {
  constructor(
    public readonly id: number,
    public readonly place: string,
    public readonly timeBox: Duration,
    public readonly duration: Duration
  ) {}

  getType(): ScrumEventTypeType {
    return ScrumEventType.DailyScrum
  }

  getStartDate(): Date {
    return this.duration.start
  }

  getEndDate(): Date {
    return this.duration.end
  }
}
