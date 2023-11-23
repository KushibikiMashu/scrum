export class Duration {
  constructor(
    public readonly start: Date,
    public readonly end: Date
  ) {}
}

export class Id {
  constructor(
    public readonly value: number|null
  ) {
  }

  static createAsNull() {
    return new Id(null)
  }

  equals(id: Id) {
    return this.value === id.value
  }
}
