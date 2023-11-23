import { ScrumEvent, ScrumEventType, ScrumEventTypeType } from './index'
import { Duration } from '@/common'

export class SprintPlanning implements ScrumEvent {
  constructor(
    public readonly id: number,
    public readonly place: string,
    public readonly timeBox: Duration,
    public readonly duration: Duration,
    public readonly sprintGoals: string[]
  ) {}

  getType(): ScrumEventTypeType {
    return ScrumEventType.SprintPlanning
  }

  getStartDate(): Date {
    return this.duration.start
  }

  getEndDate(): Date {
    return this.duration.end
  }
}
