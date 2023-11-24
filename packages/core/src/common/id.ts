export abstract class Id {
  constructor(public readonly value: number | null) {}

  toInt(): number {
    if (this.value === null) {
      throw new Error('ID が null です')
    }
    return this.value!
  }
}
