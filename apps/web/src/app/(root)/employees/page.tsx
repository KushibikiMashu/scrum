import {assertDefined, EmployeesPageQueryService} from "@panda-project/use-case";
import AddForm from "./add-form";
import EmployeeList from "./employee-list";

export default async function EmployeesPage() {
  const {data} = await new EmployeesPageQueryService().exec()
  assertDefined(data?.employees)

  return (
    <div>
      <AddForm />

      <div className="mt-6">
        <EmployeeList employees={data.employees} />
      </div>
    </div>
  )
}
