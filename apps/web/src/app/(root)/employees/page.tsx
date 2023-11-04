import {assertDefined, EmployeesPageQueryService} from "@panda-project/use-case";
import {AddForm} from "./add-form";
import EmployeeList from "~/app/(root)/employees/employee-list";

export default async function EmployeesPage() {
  const {data} = await new EmployeesPageQueryService().exec()
  assertDefined(data?.employees)

  return (
    <div>
      <AddForm />

      {/*<ul>*/}
      {/*  {data.employees.map((employee, i) =>*/}
      {/*    <Employee key={i} employeeId={employee.id!} employeeName={employee.name}/>*/}
      {/*  )}*/}
      {/*</ul>*/}

      <div className="mt-6">
        <EmployeeList employees={data.employees} />
      </div>
    </div>
  )
}
