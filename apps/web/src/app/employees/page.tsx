import { EmployeesPageQueryService} from "@panda-project/use-case";
import {AddForm} from "./add-form";
import {Employee} from "./employee";

export default async function EmployeesPage() {
  const {data} = await new EmployeesPageQueryService().exec()

  return <div>
    <AddForm/>
    <ul>
      {data!.employees.map((employee, i) =>
        <Employee key={i} employeeId={employee.id!} employeeName={employee.name} />
      )}
    </ul>
  </div>
}
