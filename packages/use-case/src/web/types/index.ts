export interface DefaultError {
  reason: ErrorReasonValueType
}

export type Result<T, E extends DefaultError = DefaultError> =
  | { data: T; error: null }
  | { data: null; error: E }

export const ErrorReason = {
  DbNotExists: 'db_not_exist',
  // product
  ProductNotExists: 'product_not_exist',
  InvalidProductName: 'invalid_product_name',
  // project
  ProjectNotExists: 'project_not_exist',
} as const
export type ErrorReasonValueType = typeof ErrorReason[keyof typeof ErrorReason]

export function assertDefined<T>(arg: T | null | undefined): asserts arg is T {
  if (arg === null || arg === undefined) {
    throw new Error(`arg is null or undefined`);
  }
}
