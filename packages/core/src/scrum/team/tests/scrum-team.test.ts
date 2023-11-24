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

const ScrumMasterFactory = (arg: { name?: string, roles?: ScrumMemberRoleType[] } | null = null) => {
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

describe('ProductOwner', () => {
  it('should create ProductOwner', () => {
    const sut = ProductOwnerFactory()

    expect(sut).toBeInstanceOf(ProductOwner)
    expect(sut.roles).toEqual([ScrumMemberRole.ProductOwner])
    expect(sut.getEmployeeId()).toEqual(new EmployeeId(200))
    expect(sut.getFullName()).toBe('プロダクト オーナー')
  })

  describe('validate', () => {
    it('should throw error when create ProductOwner with ScrumMaster role', () => {
      expect(() => {
        ProductOwnerFactory({roles: [ScrumMemberRole.ScrumMaster]})
      }).toThrow('ProductOwner cannot be ScrumMaster')
    })
  });

  describe('createFromEmployee', () => {
    it('should create ProductOwner from employee', () => {
      const employee = new Employee(
        new EmployeeId(1), EmployeeName.createFromString('開発 者')
      )
      const sut = ProductOwner.createFromEmployee(employee)

      expect(sut).toBeInstanceOf(ProductOwner)
      expect(sut.roles).toEqual([ScrumMemberRole.ProductOwner])
      expect(sut.getEmployeeId()).toEqual(new EmployeeId(1))
      expect(sut.getFullName()).toBe('開発 者')
    })
  })

  describe('createFromDeveloper', () => {
    it('should create ProductOwner from developer', () => {
      const developer = DeveloperFactory()
      const sut = ProductOwner.createFromDeveloper(developer)

      expect(sut).toBeInstanceOf(ProductOwner)
      expect(sut.roles).toEqual([ScrumMemberRole.ProductOwner, developer.role])
      expect(sut.getEmployeeId()).toEqual(new EmployeeId(1))
      expect(sut.getFullName()).toBe('開発 者')
    })
  })

  describe('isDeveloper', () => {
    it('should return true when ProductOwner has Developer role', () => {
      const sut = ProductOwnerFactory({roles: [ScrumMemberRole.ProductOwner]})
      expect(sut.isDeveloper()).toBeFalsy()
    })

    it('should return false when ProductOwner does not have Developer role', () => {
      const sut = ProductOwnerFactory({roles: [ScrumMemberRole.ProductOwner, ScrumMemberRole.Developer]})
      expect(sut.isDeveloper()).toBeTruthy()
    })
  });
})

describe('ScrumMaster', () => {
  it('should create ScrumMaster', () => {
    const sut = ScrumMasterFactory()

    expect(sut).toBeInstanceOf(ScrumMaster)
    expect(sut.roles).toEqual([ScrumMemberRole.ScrumMaster])
    expect(sut.getEmployeeId()).toEqual(new EmployeeId(300))
    expect(sut.getFullName()).toBe('スクラム マスター')
  })

  describe('validate', () => {
    it('should throw error when create ScrumMaster with ProductOwner role', () => {
      expect(() => {
        ScrumMasterFactory({roles: [ScrumMemberRole.ProductOwner]})
      }).toThrow('ScrumMaster cannot be ProductOwner')
    })

    it('should throw error when create ScrumMaster without ScrumMaster role', () => {
      expect(() => {
        ScrumMasterFactory({roles: [ScrumMemberRole.Developer]})
      }).toThrow('ScrumMaster must have ScrumMasterRole')
    })
  })

  describe('createFromEmployee', () => {
    it('should create ScrumMaster from employee', () => {
      const employee = new Employee(
        new EmployeeId(1), EmployeeName.createFromString('開発 者')
      )
      const sut = ScrumMaster.createFromEmployee(employee)

      expect(sut).toBeInstanceOf(ScrumMaster)
      expect(sut.roles).toEqual([ScrumMemberRole.ScrumMaster])
      expect(sut.getEmployeeId()).toEqual(new EmployeeId(1))
      expect(sut.getFullName()).toBe('開発 者')
    })
  })

  describe('createFromDeveloper', () => {
    it('should create ScrumMaster from developer', () => {
      const developer = DeveloperFactory()
      const sut = ScrumMaster.createFromDeveloper(developer)

      expect(sut).toBeInstanceOf(ScrumMaster)
      expect(sut.roles).toEqual([ScrumMemberRole.ScrumMaster, developer.role])
      expect(sut.getEmployeeId()).toEqual(new EmployeeId(1))
      expect(sut.getFullName()).toBe('開発 者')
    })
  })

  describe('isDeveloper', () => {
    it('should return true when ScrumMaster has Developer role', () => {
      const sut = ScrumMasterFactory({roles: [ScrumMemberRole.ScrumMaster]})
      expect(sut.isDeveloper()).toBeFalsy()
    })

    it('should return false when ScrumMaster does not have Developer role', () => {
      const sut = ScrumMasterFactory({roles: [ScrumMemberRole.ScrumMaster, ScrumMemberRole.Developer]})
      expect(sut.isDeveloper()).toBeTruthy()
    })
  })
})

describe('Developer', () => {
it('should create Developer', () => {
    const sut = DeveloperFactory()

    expect(sut).toBeInstanceOf(Developer)
    expect(sut.role).toEqual(ScrumMemberRole.Developer)
    expect(sut.getEmployeeId()).toEqual(new EmployeeId(1))
    expect(sut.getFullName()).toBe('開発 者')
  })

  describe('createFromEmployee', () => {
    it('should create Developer from employee', () => {
      const employee = new Employee(
        new EmployeeId(1), EmployeeName.createFromString('開発 者')
      )
      const sut = Developer.createFromEmployee(employee)

      expect(sut).toBeInstanceOf(Developer)
      expect(sut.role).toEqual(ScrumMemberRole.Developer)
      expect(sut.getEmployeeId()).toEqual(new EmployeeId(1))
      expect(sut.getFullName()).toBe('開発 者')
    })
  })

  describe('isDeveloper', () => {
    it('should return true', () => {
      const sut = DeveloperFactory()
      expect(sut.isDeveloper()).toBeTruthy()
    })
  })
})


