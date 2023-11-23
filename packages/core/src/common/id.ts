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

  toInt(): number {
    if (this.value === null) {
      throw new Error('ID が null です')
    }
    return this.value!
  }
}
