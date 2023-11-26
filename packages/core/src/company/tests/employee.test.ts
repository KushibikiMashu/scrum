import { EmployeeId, EmployeeName, Employee, Member } from '../employee'

describe('EmployeeId', () => {
  describe('createAsNull', () => {
    it('should return self with null', () => {
      const actual = EmployeeId.createAsNull()
      expect(actual).toBeInstanceOf(EmployeeId)
      expect(actual.value).toBeNull()
    })
  })

  describe('equals', () => {
    it('should return true', () => {
      const sut = new EmployeeId(100)
      const target = new EmployeeId(100)
      expect(sut.equals(target)).toBeTruthy()
    })

    it('should return false', () => {
      const sut = new EmployeeId(100)
      const target = new EmployeeId(200)
      expect(sut.equals(target)).toBeFalsy()
    })
  })
})

describe('EmployeeName', () => {
  describe('createFromString', () => {
    it('should return EmployeeName', () => {
      const actual = EmployeeName.createFromString('山田 太郎')
      expect(actual).toBeInstanceOf(EmployeeName)
      expect(actual.familyName).toBe('山田')
      expect(actual.firstName).toBe('太郎')
    })

    it('should throw error', () => {
      expect(() => {
        EmployeeName.createFromString('山田太郎')
      }).toThrow('社員名は姓名を半角スペースで区切ってください')
    })
  })

  describe('getFullName', () => {
    it('should return full name', () => {
      const sut = new EmployeeName('太郎', '山田')
      expect(sut.getFullName()).toBe('山田 太郎')
    })
  })
})

describe('Employee', () => {
  describe('updateName', () => {
    it('should return Employee', () => {
      const sut = new Employee(new EmployeeId(100), new EmployeeName('太郎', '山田'))
      const actual = sut.updateName(new EmployeeName('花子', '鈴木'))
      expect(actual).toBeInstanceOf(Employee)
      expect(actual.id).toEqual(sut.id)
      expect(actual.employeeName).not.toEqual(sut.employeeName)
    })
  })
})

describe('Member', () => {
  describe('createFromEmployee', () => {
    it('should return Member', () => {
      const sut = new Employee(new EmployeeId(100), new EmployeeName('太郎', '山田'))
      const actual = Member.createFromEmployee(sut)
      expect(actual).toBeInstanceOf(Member)
      expect(actual.employee).toEqual(sut)
    })
  })
})
