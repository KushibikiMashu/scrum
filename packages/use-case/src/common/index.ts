export class AutoIncrementId {
  constructor(
    public readonly id: number,
  ) {
  }

  static createFromRecords(records: any[]) {
    return new AutoIncrementId(records.length + 1)
  }
}
