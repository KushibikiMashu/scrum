export class Duration {
  constructor(
    public readonly start: Date,
    public readonly end: Date
  ) {}
}

export class ID {
  constructor(
    public readonly id: number|null
  ) {
  }

  static createAsNull() {
    return new ID(null)
  }
}
