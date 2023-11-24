import {Employee, EmployeeId, EmployeeName, Member} from "../../../company";
import {
  ScrumMemberRole,
  ScrumMemberRoleType,
  ScrumTeamId,
  ScrumTeam,
  ScrumMaster,
  ProductOwner,
  Developer
} from "../scrum-team";

const DeveloperFactory = (arg: { name?: string, employeeId?: number } | null = null) => {
  return new Developer(
    Member.createFromEmployee(
      new Employee(
        new EmployeeId(arg?.employeeId ?? 1), EmployeeName.createFromString(arg?.name ?? '開発 者')
      )
    )
  )
}

const ProductOwnerFactory = (arg: { name?: string, roles?: ScrumMemberRoleType[] } | null = null) => {
  return new ProductOwner(
    arg?.roles ?? [ScrumMemberRole.ProductOwner],
    Member.createFromEmployee(
      new Employee(
        new EmployeeId(200), EmployeeName.createFromString(arg?.name ?? 'プロダクト オーナー')
      )
    )
  )
}

const ScrumMasterFactory = (arg: { name: string, roles?: ScrumMemberRoleType[] } | null = null) => {
  return new ScrumMaster(
    arg?.roles ?? [ScrumMemberRole.ScrumMaster],
    Member.createFromEmployee(
      new Employee(
        new EmployeeId(300), EmployeeName.createFromString(arg?.name ?? 'スクラム マスター')
      )
    )
  )
}

describe('ScrumTeamId', () => {
  describe('createAsNull', () => {
    it('should create as null', () => {
      const id = ScrumTeamId.createAsNull()
      expect(id).toBeInstanceOf(ScrumTeamId)
      expect(id.value).toBeNull()
    })
  })

  describe('equals', () => {
    it('should return true when the value is the same', () => {
      const sut = new ScrumTeamId(1)
      const target = new ScrumTeamId(1)
      expect(sut.equals(target)).toBeTruthy()
    })

    it('should return false when the value is different', () => {
      const sut = new ScrumTeamId(1)
      const target = new ScrumTeamId(2)
      expect(sut.equals(target)).toBeFalsy()
    })
  })
})

describe('ScrumTeam', () => {
  let defaultScrumTeam: ScrumTeam
  beforeEach(() => {
    defaultScrumTeam = new ScrumTeam(
      new ScrumTeamId(1),
      ProductOwnerFactory(),
      ScrumMasterFactory(),
      [DeveloperFactory()]
    )
  })

  describe('createWithProductOwnerAndScrumMaster', () => {
    it('should create ScrumTeam', () => {
      const productOwner = ProductOwnerFactory()
      const scrumMaster = ScrumMasterFactory()
      const team = ScrumTeam.createWithProductOwnerAndScrumMaster(productOwner, scrumMaster)

      expect(team).toBeInstanceOf(ScrumTeam)
      expect(team.id.value).toBeNull()
      expect(team.productOwner.getFullName()).toBe('プロダクト オーナー')
      expect(team.scrumMaster.getFullName()).toBe('スクラム マスター')
      expect(team.developers).toHaveLength(0)
    })
  })

  describe('createNew', () => {
    it('should create ScrumTeam', () => {
      const productOwner = ProductOwnerFactory()
      const scrumMaster = ScrumMasterFactory()
      const developers = [DeveloperFactory()]
      const team = ScrumTeam.createNew(productOwner, scrumMaster, developers)

      expect(team).toBeInstanceOf(ScrumTeam)
      expect(team.id.value).toBeNull()
      expect(team.productOwner.getFullName()).toBe('プロダクト オーナー')
      expect(team.scrumMaster.getFullName()).toBe('スクラム マスター')
      expect(team.developers).toHaveLength(1)
      expect(team.developers[0].getFullName()).toBe('開発 者')
    })
  })

  describe('changeProductOwner', () => {
    it('should change product owner', () => {
      const productOwner = ProductOwnerFactory({name: '新しい プロダクトオーナー'})
      const newTeam = defaultScrumTeam.changeProductOwner(productOwner)
      expect(newTeam.productOwner.getFullName()).toBe('新しい プロダクトオーナー')
    })
  })

  describe('changeScrumMaster', () => {
    it('should change scrum master', () => {
      const scrumMaster = ScrumMasterFactory({name: '新しい スクラムマスター'})
      const newTeam = defaultScrumTeam.changeScrumMaster(scrumMaster)
      expect(newTeam.scrumMaster.getFullName()).toBe('新しい スクラムマスター')
    })
  })

  describe('getDeveloperByEmployeeId', () => {
    it('should return developer', () => {
      const developer = defaultScrumTeam.getDeveloperByEmployeeId(new EmployeeId(1))
      expect(developer.getFullName()).toBe('開発 者')
    })

    it('should throw error', () => {
      expect(() => {
        defaultScrumTeam.getDeveloperByEmployeeId(new EmployeeId(3))
      }).toThrow('開発者がスクラムチームに参加していません。ID: 3')
    })
  })

  describe('addDeveloper', () => {
    it('should add developer', () => {
      const newDeveloper = DeveloperFactory({name: '新しい 開発者'})
      const newTeam = defaultScrumTeam.addDeveloper(newDeveloper)
      expect(newTeam.developers).toHaveLength(2)
      expect(newTeam.developers[0].getFullName()).toBe('開発 者')
      expect(newTeam.developers[1].getFullName()).toBe('新しい 開発者')
      expect(newTeam.productOwner.getEmployeeId())
    })
  })

  describe('updateDevelopers', () => {
    it('should update developers', () => {
      const newDeveloper = DeveloperFactory({name: '新しい 開発者'})
      const newTeam = defaultScrumTeam.updateDevelopers([newDeveloper])
      expect(newTeam.developers).toHaveLength(1)
      expect(newTeam.developers[0].getFullName()).toBe('新しい 開発者')
    })
  })

  describe('removeDeveloper', () => {
    it('should remove developer', () => {
      const team = new ScrumTeam(
        new ScrumTeamId(1),
        ProductOwnerFactory(),
        ScrumMasterFactory(),
        [
          DeveloperFactory({employeeId: 1, name: '開発 者1'}),
          DeveloperFactory({employeeId: 2, name: '開発 者2'}),
          DeveloperFactory({employeeId: 3, name: '開発 者3'}),
          ]
      )

      const newTeam = team.removeDeveloper(team.developers[1])
      expect(newTeam.developers).toHaveLength(2)
      expect(newTeam.developers[0].getFullName()).toBe('開発 者1')
      expect(newTeam.developers[1].getFullName()).toBe('開発 者3')
    })
  })

  describe('countScrumMembers', () => {
    it('should return count of scrum members', () => {
      expect(defaultScrumTeam.countScrumMembers()).toBe(3)
    })
  })

  describe('isBelongTo', () => {
    it('should return true when employee belongs to', () => {
      expect(defaultScrumTeam.isBelongTo(new EmployeeId(1))).toBeTruthy()
      expect(defaultScrumTeam.isBelongTo(new EmployeeId(200))).toBeTruthy()
      expect(defaultScrumTeam.isBelongTo(new EmployeeId(300))).toBeTruthy()
    })

    it('should return false when employee does not belong to', () => {
      expect(defaultScrumTeam.isBelongTo(new EmployeeId(999))).toBeFalsy()
    })
  })

  describe('isScrumTeamDeveloper', () => {
    it('should return true when employee belongs to', () => {
      expect(defaultScrumTeam.isScrumTeamDeveloper(new EmployeeId(1))).toBeTruthy()
    })

    it('should return false when employee does not belong to', () => {
      expect(defaultScrumTeam.isScrumTeamDeveloper(new EmployeeId(200))).toBeFalsy() // PO
      expect(defaultScrumTeam.isScrumTeamDeveloper(new EmployeeId(300))).toBeFalsy() // SM
      expect(defaultScrumTeam.isScrumTeamDeveloper(new EmployeeId(999))).toBeFalsy()
    })
  })

  describe('getProductOwnerId', () => {
    it('should return product owner id', () => {
      expect(defaultScrumTeam.getProductOwnerId()).toEqual(new EmployeeId(200))
    })
  })

  describe('getScrumMasterId', () => {
    it('should return scrum master id', () => {
      expect(defaultScrumTeam.getScrumMasterId()).toEqual(new EmployeeId(300))
    })
  })

  describe('getDeveloperIds', () => {
    it('should return developer ids', () => {
      expect(defaultScrumTeam.getDeveloperIds()).toEqual([new EmployeeId(1)])
    })
  })
})
