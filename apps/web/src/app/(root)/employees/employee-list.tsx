import {EmployeeListQueryService} from "@panda-project/use-case";
import Employee from "./employee";
import {UserIcon} from "@heroicons/react/20/solid";
import {assertDefined} from "~/utils";

function EmployeeEmpty() {
  return (
    <div className="text-center">
      <div className="flex justify-center">
        <UserIcon className="h-16 w-16 text-gray-700" />
      </div>
      <h3 className="mt-2 text-sm font-semibold text-gray-800">社員がまだ登録されていません</h3>
      <p className="mt-1 text-sm text-gray-500">社員の名前を登録してください。</p>
    </div>
  )
}

export default async function EmployeeList() {
  const {data} = await new EmployeeListQueryService().exec()
  assertDefined(data?.employees)

  return (
    <div>
      <h2 className="text-base font-semibold leading-6 text-gray-600">社員一覧</h2>

      <div className="mt-2">
      {data.employees.length === 0 ?
          <EmployeeEmpty />
        : (
          <ul role="list" className="divide-y divide-gray-100">
            {data.employees.map((employee, i) => (
              <Employee key={i} employee={employee}/>
            ))}
          </ul>
        )
      }
      </div>
    </div>
  )
}
