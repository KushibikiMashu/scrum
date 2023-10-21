type DefaultError = {
  reason: ErrorReasonValueType
  [key: string]: string
}

export type Result<T, E extends DefaultError = DefaultError> =
  | { data: T; error: null }
  | { data: null; error: E }

export const ErrorReason = {
  DbNotExists: 'db_not_exist',
  ProductNotExists: 'product_not_exist',
} as const
type ErrorReasonValueType = typeof ErrorReason[keyof typeof ErrorReason]

