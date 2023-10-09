import {ID} from "@panda-project/core";

export class AutoIncrementId extends ID {
  static createFromRecords(records: any[]) {
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
