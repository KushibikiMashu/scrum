export interface DefaultError {
  reason: ErrorReasonValueType
}

export type Result<T, E extends DefaultError = DefaultError> =
  | { data: T; error: null }
  | { data: null; error: E }

export const ErrorReason = {
  // common
  DbNotExists: 'db_not_exists',
  UnknownError: 'unknown_error',
  // product
  ProductNotExists: 'product_not_exists',
  InvalidProductName: 'invalid_product_name',
  // project
  ProjectNotExists: 'project_not_exists',
  InvalidProjectName: 'invalid_project_name',
  // scrum team
  ScrumTeamNotExists: 'scrum_team_not_exists',
} as const
export type ErrorReasonValueType = typeof ErrorReason[keyof typeof ErrorReason]

export function assertDefined<T>(value: T): asserts value is NonNullable<T> {
  if (value === null) {
    throw new Error(`arg is null`);
  }
}

export function assertIsString<T>(arg: T | string): asserts arg is string {
  if (typeof arg === 'string') {
    throw new Error(`arg is not string`);
  }
}
