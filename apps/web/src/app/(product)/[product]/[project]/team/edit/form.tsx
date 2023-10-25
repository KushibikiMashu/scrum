'use client'

import {ScrumTeamEditQueryServiceDto} from "@panda-project/use-case";
import {useFormState, useFormStatus} from "react-dom";
import {updateTeam} from "./actions";
import Link from "next/link";

type Props = Pick<ScrumTeamEditQueryServiceDto, 'scrumTeam' | 'employees'>

function SubmitButton() {
  const {pending} = useFormStatus()
  return <button type="submit" disabled={pending}>保存する</button>
}

export function TeamForm({scrumTeam, employees}: Props) {
  const filteredEmployees = employees
    .map((employee) => ({id: employee.id, name: employee.fullName}))
  const developersMaxCount = Math.max(Math.min(10, filteredEmployees.length - 2), 1)

  // TODO: エラーメッセージを表示する
  const [_, action] = useFormState(updateTeam, {message: '', errors: null, dom: null})

  return (
    <div>
      <h2>スクラムチームを編集する</h2>
      <form action={action}>
        <div>
          <p>プロダクトオーナー*</p>
          <div>
            <select name="product-owner-id" required defaultValue={scrumTeam?.productOwner.employeeId ?? ""}>
              <option value="" disabled>---</option>
              {filteredEmployees.map((employee) =>
                <option key={employee.id} value={employee.id}>{employee.name}</option>
              )}
            </select>
          </div>
        </div>
        <div>
          <p>スクラムマスター*</p>
          <div>
            <select name="scrum-master-id" required defaultValue={scrumTeam?.scrumMaster.employeeId ?? ""}>
              <option value="" disabled>---</option>
              {filteredEmployees.map((employee) =>
                <option key={employee.id} value={employee.id}>{employee.name}</option>
              )}
            </select>
          </div>
        </div>
        <div>
          <p className="space-x-2">
            <span>開発者</span>
          </p>
          <div>
            {[...Array(developersMaxCount)].map((_, i) => {
              const defaultValue = scrumTeam?.developers[i]?.employeeId ?? ""
              return (
                <div key={i}>
                  <select name='developers' defaultValue={defaultValue}>
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

        <SubmitButton/>
      </form>
      <div>
        <Link href="/employees">社員を登録する</Link>
      </div>
      <div>
        <Link href="..">戻る</Link>
      </div>
    </div>
  )
}
