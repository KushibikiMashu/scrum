import { ProjectId, ProjectName } from '../project'

describe('ProjectId', () => {
  describe('createAsNull', () => {
    it('should create as null', () => {
      const id = ProjectId.createAsNull()
      expect(id).toBeInstanceOf(ProjectId)
      expect(id.value).toBeNull()
    })
  })

  describe('equals', () => {
    it('should return true when the value is the same', () => {
      const sut = new ProjectId(1)
      const target = new ProjectId(1)
      expect(sut.equals(target)).toBeTruthy()
    })

    it('should return false when the value is different', () => {
      const sut = new ProjectId(1)
      const target = new ProjectId(2)
      expect(sut.equals(target)).toBeFalsy()
    })
  })
})

describe('ProjectName', () => {
  describe('constructor', () => {
    it('should create ProjectName', () => {
      const name = new ProjectName('name')
      expect(name).toBeInstanceOf(ProjectName)
      expect(name.value).toBe('name')
    })

    it('should throw error', () => {
      expect(() => {
        new ProjectName('')
      }).toThrow('1文字以上入力してください')
    })
  })
})
