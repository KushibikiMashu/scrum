import {AutoIncrementId} from "@/common";
import {Developer, EmployeeRepositoryInterface, ScrumTeamRepositoryInterface} from "@panda-project/core";
import {EmployeeRepository, ScrumTeamRepository} from "@/gateway/repository";

export type AddDeveloperCallback = (arg: Awaited<ReturnType<FetchAllEmployeesWithoutScrumMembersUseCase['exec']>>) => Promise<AddDeveloperUserInputType>

export class AddDeveloperScenario {
  constructor(
    private readonly validateUseCase: ValidateUseCase = new ValidateUseCase(),
    private readonly fetchAllEmployeesWithoutScrumMembersUseCase: FetchAllEmployeesWithoutScrumMembersUseCase = new FetchAllEmployeesWithoutScrumMembersUseCase(),
    private readonly addDeveloperUseCase: AddDeveloperUseCase = new AddDeveloperUseCase(),
  ) {
  }

  async exec(
    firstCallback: AddDeveloperCallback,
    secondCallback: () => Promise<boolean>,
  ): Promise<string|undefined> {
    await this.validateUseCase.exec()
    const allEmployees = await this.fetchAllEmployeesWithoutScrumMembersUseCase.exec()

    for (let i = allEmployees.length;  allEmployees.length > 0; i--) {
      const options = await this.fetchAllEmployeesWithoutScrumMembersUseCase.exec()
      const input = await firstCallback(options)
      await this.addDeveloperUseCase.exec(new AddDeveloperInput(input))

      if (i > 1) {
        const shouldSelectMore = await secondCallback()
        if (!shouldSelectMore) {
          return
        }
      } else if (i === 1) {
        return '開発者としてスクラムチームに参加できる社員はもういません'
      }
    }
  }
}

type AddDeveloperUserInputType = {
  employeeId: number
}

class AddDeveloperInput {
  constructor(private readonly userInput: AddDeveloperUserInputType) {}

  getEmployeeId() {
    return new AutoIncrementId(this.userInput.employeeId)
  }
}

class ValidateUseCase {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
    private readonly canAddDeveloperFromEmployee: CanAddDeveloperFromEmployee = new CanAddDeveloperFromEmployee(),
  ) {}

  async exec() {
    const exists = await this.scrumTeamRepository.exists()
    if (!exists) {
      throw new Error('スクラムチームが作成されていません')
    }
    const canAddDeveloperFromEmployee = await this.canAddDeveloperFromEmployee.exec()
    if (!canAddDeveloperFromEmployee) {
      throw new Error('開発者として参加できる社員がいません')
    }
  }
}

// 「社員集約」と「スクラムチーム集約」の中の要素の個数比較なので、
// どちらかの集約に書くのはおかしいのでドメインサービスとして書いている。が一考の余地はある
class CanAddDeveloperFromEmployee {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {}

  async exec() : Promise<boolean> {
    const employeeCount = await this.employeeRepository.count()
    const scrumTeam = await this.scrumTeamRepository.fetch()
    return employeeCount > scrumTeam.countScrumMembers()
  }
}

class FetchAllEmployeesWithoutScrumMembersUseCase {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {}

  async exec(): Promise<{id: number; name: string}[]> {
    const employees = await this.employeeRepository.findAll()
    const scrumTeam = await this.scrumTeamRepository.fetch()
    return employees.filter(employee => {
      const isPo = scrumTeam.productOwner.member.employee.id.equals(employee.id)
      const isSm = scrumTeam.scrumMaster.member.employee.id.equals(employee.id)
      const isDeveloper = scrumTeam.developers.some(developer => developer.member.employee.id.equals(employee.id))
      return !isPo && !isSm && !isDeveloper
    }).map(employee => ({
      id: employee.id.value!,
      name: employee.employeeName.getFullName(),
    }))
  }
}

class AddDeveloperUseCase {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
  ) {}

  async exec(input: AddDeveloperInput) {
    const employee = await this.employeeRepository.findByIdOrFail(input.getEmployeeId())
    const scrumTeam = await this.scrumTeamRepository.fetch()

    const developer = Developer.createFromEmployee(employee)
    const newScrumTeam = scrumTeam.addDeveloper(developer)

    await this.scrumTeamRepository.update(newScrumTeam)
  }
}
