export class Duration {
  constructor(
    public readonly start: Date,
    public readonly end: Date
  ) {}
}

export class ID {
  constructor(
    public readonly value: number|null
  ) {
  }

  static createAsNull() {
    return new ID(null)
  }

  equals(id: ID) {
    return this.value === id.value
  }
}
