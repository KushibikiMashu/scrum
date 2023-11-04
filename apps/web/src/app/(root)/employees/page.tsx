import {assertDefined, EmployeesPageQueryService} from "@panda-project/use-case";
import {AddForm} from "./add-form";
import {Employee} from "./employee";
import Link from "next/link";
import EmployeeList from "~/app/(root)/employees/employee-list";

export default async function EmployeesPage() {
  const {data} = await new EmployeesPageQueryService().exec()
  assertDefined(data?.employees)
  const path = typeof data?.productName === 'string' ? `/${data.productName}` : '/'

  return (
    <div>
      <EmployeeList employees={data.employees} />

      <AddForm/>
      <ul>
        {data.employees.map((employee, i) =>
          <Employee key={i} employeeId={employee.id!} employeeName={employee.name}/>
        )}
      </ul>
      <Link href={path}>top</Link>
    </div>
  )
}
