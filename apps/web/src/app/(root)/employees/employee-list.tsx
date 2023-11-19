import {assertDefined, EmployeeListQueryService} from "@panda-project/use-case";
import Employee from "./employee";

export default async function EmployeeList() {
  const {data} = await new EmployeeListQueryService().exec()
  assertDefined(data?.employees)

  return (
    <div>
      <h2 className="text-base font-semibold leading-6 text-gray-600">社員一覧</h2>

      {/* TODO: スタイリングする */}
      {data.employees.length === 0 ?
        <p>社員はまだ登録されていません</p>
        : (
          <ul role="list" className="mt-2 divide-y divide-gray-100">
            {data.employees.map((employee, i) => (
              <Employee key={i} employee={employee}/>
            ))}
          </ul>
        )
      }
    </div>
  )
}
