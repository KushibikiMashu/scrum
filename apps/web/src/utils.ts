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

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
