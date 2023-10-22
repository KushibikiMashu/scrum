import {Employee, EmployeeRepositoryInterface, ProductName, ProductRepositoryInterface} from "@panda-project/core";
import {EmployeeRepository, ProductRepository} from "@/gateway";
import {Result} from "../types";

type Dto = {
  employees: {
    id: NonNullable<Employee['id']['value']>
    name: string
  }[]
  productName: ProductName['value'] | null
}

export class EmployeesPageQueryService {
  constructor(
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository(),
    private readonly productRepository: ProductRepositoryInterface = new ProductRepository(),
  ) {
  }

  async exec(): Promise<Result<Dto>> {
    const employees = await this.employeeRepository.findAll()
    const product = await this.productRepository.fetch()

    if (employees.length === 0 || product === null) {
      return {
        data: {
          employees: [],
          productName: null,
        },
        error: null
      }
    }

    return {
      data: {
        employees: employees.map((employee) =>
          ({
            id: employee.id.value!,
            name: employee.employeeName.getFullName(),
          })
        ),
        productName: product.name.value,
      },
      error: null
    }
  }
}
