import { ScrumEvent, ScrumEventType, ScrumEventTypeType } from './index'

import { Duration } from '@/common'
import { Increment } from '@/scrum/artifact'

export const SprintTimeBox = {
  OneWeek: 'one_week',
  TwoWeeks: 'two_weeks',
  ThreeWeeks: 'three_weeks',
  FourWeeks: 'four_weeks',
} as const

class Sprint implements ScrumEvent {
  constructor(
    public readonly sprintPlanningId: number,
    public readonly dailyScrumIds: number[],
    public readonly sprintReviewId: number,
    public readonly sprintRetrospectiveId: number,
    public readonly sprintBacklogId: number,
    public readonly sprintGoals: string[],
    public readonly increments: Increment[],
    public readonly sprintTimeBox: (typeof SprintTimeBox)[keyof typeof SprintTimeBox],
    public readonly duration: Duration
  ) {}

  getType(): ScrumEventTypeType {
    return ScrumEventType.Sprint
  }

  getStartDate(): Date {
    return this.duration.start
  }

  getEndDate(): Date {
    return this.duration.end
  }
}
