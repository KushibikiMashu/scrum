import {EmployeesPageQueryService} from "@panda-project/use-case";
import {AddForm} from "./AddForm";

export default async function EmployeesPage() {
  const {data} = await new EmployeesPageQueryService().exec()

  return <div>
    <AddForm />
    <ul>
      {data.employees.map((employee) => <li key={employee.id!}>{employee.name}</li>)}
    </ul>
  </div>
}
