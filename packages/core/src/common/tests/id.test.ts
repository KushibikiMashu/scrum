import {Id} from '../id'

class ChildClass extends Id {
}

describe('toInt', () => {
  it('should return given value', () => {
    const sut = new ChildClass(100)
    expect(sut.toInt()).toBe(100)
  })

  it('should throw an error', () => {
    const sut = new ChildClass(null)
    expect(() => {
      sut.toInt()
    }).toThrowError('値が null です')
  })
})
