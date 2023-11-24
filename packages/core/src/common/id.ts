export abstract class Id {
  constructor(public readonly value: number | null) {}

  toInt(): number {
    if (this.value === null) {
      throw new Error('値が null です')
    }
    return this.value
  }
}
