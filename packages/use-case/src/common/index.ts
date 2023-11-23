import { Id } from '@panda-project/core'

export class AutoIncrementId extends Id {
  constructor(public readonly value: number) {
    super(value)
  }

  static createFromRecords(records: any[]): NonNullable<AutoIncrementId> {
    // 空の時
    if (records.length === 0) {
      return new AutoIncrementId(records.length + 1)
    }

    // 欠番がある時の対応
    const lastRecord = records.at(records.length - 1)
    if (lastRecord?.id) {
      return new AutoIncrementId(lastRecord.id + 1)
    }

    throw new Error('id が判定できません')
  }
}

export interface Logger {
  log(message?: any, ...optionalParams: any[]): void
  info(message?: any, ...optionalParams: any[]): void
  error(message?: any, ...optionalParams: any[]): void
  warn(message?: any, ...optionalParams: any[]): void
  debug(message?: any, ...optionalParams: any[]): void
}
