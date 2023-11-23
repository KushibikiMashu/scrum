export const ScrumEventType = {
  Sprint: 'sprint',
  SprintPlanning: 'sprint_planning',
  DailyScrum: 'daily_scrum',
  SprintReview: 'sprint_review',
  SprintRetrospective: 'sprint_retrospective',
} as const
export type ScrumEventTypeType = (typeof ScrumEventType)[keyof typeof ScrumEventType]

export interface ScrumEvent {
  getType(): ScrumEventTypeType
  getStartDate(): Date
  getEndDate(): Date
}
