import { EmployeesPageQueryService} from "@panda-project/use-case";
import {AddForm} from "./add-form";
import {Employee} from "./employee";
import Link from "next/link";

export default async function EmployeesPage() {
  const {data} = await new EmployeesPageQueryService().exec()
  const path = data.productName === null ? '/' : `/${data.productName}`

  return <div>
    <AddForm/>
    <ul>
      {data!.employees.map((employee, i) =>
        <Employee key={i} employeeId={employee.id!} employeeName={employee.name} />
      )}
    </ul>
    <Link href={path}>top</Link>
  </div>
}
