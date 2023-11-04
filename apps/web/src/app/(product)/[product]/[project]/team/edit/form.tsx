'use client'

import {ScrumTeamEditQueryServiceDto} from "@panda-project/use-case";
import {useFormState, useFormStatus} from "react-dom";
import {updateTeam} from "./actions";
import Link from "next/link";

type Props = Pick<ScrumTeamEditQueryServiceDto, 'scrumTeam' | 'employees'>

function SubmitButton() {
  const {pending} = useFormStatus()
  return <button className="text-xs border border-gray-300 hover:bg-gray-50 rounded-md px-3 py-2" type="submit" disabled={pending}>保存する</button>
}

export function TeamForm({scrumTeam, employees}: Props) {
  const filteredEmployees = employees
    .map((employee) => ({id: employee.id, name: employee.fullName}))
  const developersMaxCount = Math.max(Math.min(10, filteredEmployees.length - 2), 1)

  // TODO: エラーメッセージを表示する
  const [_, action] = useFormState(updateTeam, {message: '', errors: null, dom: null})

  return (
    <div className="max-w-xs">
      <form className="space-y-4" action={action}>
        <div className="space-y-2">
          <p className="block text-sm font-medium leading-6 text-gray-900">プロダクトオーナー*</p>
          <div>
            <select
              className="w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm border-gray-300 focus:outline-none sm:text-sm sm:leading-6"
              name="product-owner-id"
              required
              defaultValue={scrumTeam?.productOwner.employeeId ?? ""}
            >
              <option value="" disabled>---</option>
              {filteredEmployees.map((employee) =>
                <option key={employee.id} value={employee.id}>{employee.name}</option>
              )}
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <p className="block text-sm font-medium leading-6 text-gray-900">スクラムマスター*</p>
          <div>
            <select
              className="w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm border-gray-300 focus:outline-none sm:text-sm sm:leading-6"
              name="scrum-master-id"
              required
              defaultValue={scrumTeam?.scrumMaster.employeeId ?? ""}
            >
              <option value="" disabled>---</option>
              {filteredEmployees.map((employee) =>
                <option key={employee.id} value={employee.id}>{employee.name}</option>
              )}
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <p className="block text-sm font-medium leading-6 text-gray-900">開発者</p>
          <div className="space-y-2">
            {[...Array(developersMaxCount)].map((_, i) => {
              const defaultValue = scrumTeam?.developers[i]?.employeeId ?? ""
              return (
                <div key={i}>
                  <select
                    className="w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm border-gray-300 focus:outline-none sm:text-sm sm:leading-6"
                    name='developers'
                    defaultValue={defaultValue}
                  >
                    <option value="">---</option>
                    {filteredEmployees.map((employee) =>
                      <option key={employee.id} value={employee.id}>{employee.name}</option>
                    )}
                  </select>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-4 text-right">
          <SubmitButton/>
        </div>
      </form>

      <div className="mt-6">
        <div className="text-right">
          <Link className="text-xs border border-gray-300 hover:bg-gray-50 rounded-md px-3 py-2" href="/employees">社員を登録する</Link>
        </div>
      </div>
    </div>
  )
}
