import {ProductId, ProductName} from '../product'

describe('ProductId', () => {
  describe('createAsNull', () => {
    it('should return ProductId', () => {
      const actual = ProductId.createAsNull()
      expect(actual).toBeInstanceOf(ProductId)
      expect(actual.value).toBeNull()
    })
  })

  describe('equals', () => {
    it('should return true', () => {
      const sut = new ProductId(100)
      const target = new ProductId(100)
      expect(sut.equals(target)).toBeTruthy()
    })

    it('should return false', () => {
      const sut = new ProductId(100)
      const target = new ProductId(200)
      expect(sut.equals(target)).toBeFalsy()
    })
  })
})

describe('ProductName', () => {
  describe('constructor', () => {
    it('should return ProductName', () => {
      const actual = new ProductName('name')
      expect(actual).toBeInstanceOf(ProductName)
      expect(actual.value).toBe('name')
    })

    it('should throw error', () => {
      expect(() => {
        new ProductName('')
      }).toThrow('1文字以上入力してください')
    })
  })
})
