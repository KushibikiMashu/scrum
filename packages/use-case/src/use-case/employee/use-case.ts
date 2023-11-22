import {Employee, EmployeeRepositoryInterface, ID, ScrumTeamRepositoryInterface} from "@panda-project/core";
import {EmployeeRepository, ScrumTeamRepository} from "@/gateway/repository/db";
import {CreateEmployeeCommand, DeleteEmployeeCommand, EditEmployeeCommand} from "@/use-case/employee";

export class EmployeeUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
  ) {
  }

  async create(command: CreateEmployeeCommand): Promise<void> {
    const count = await this.employeeRepository.count()
    if (count > 50) {
      throw new Error('登録できる従業員数の上限に達しました。登録可能な人数は50名以下です')
    }

    const employeeName = command.getEmployeeName()
    const employee = new Employee(ID.createAsNull(), employeeName)

    await this.employeeRepository.save(employee)
  }

  async edit(command: EditEmployeeCommand) {
    const employee = await this.employeeRepository.findByIdOrFail(command.getEmployeeId())
    const newName = command.getNewEmployeeName()
    const newEmployee = employee.updateName(newName)

    await this.employeeRepository.update(newEmployee)
  }

  async delete(command: DeleteEmployeeCommand) {
    const employee = await this.employeeRepository.findByIdOrFail(command.getEmployeeId())

    let scrumTeam = null
    try {
      // TODO: fetch で null を返すようにする。null が返ってきて欲しいケースはここが初めてなので。
      scrumTeam = await this.scrumTeamRepository.fetchOrFail()
    } catch (e: unknown) {
      await this.employeeRepository.delete(employee)
      return
    }

    const isBelongToScrumTeam = scrumTeam.isBelongTo(employee.id)
    if (isBelongToScrumTeam) {
      throw new Error('社員がスクラムチームに所属しているため、削除できません')
    }

    await this.employeeRepository.delete(employee)
  }
}
