'use client'

import {EditForm} from "./edit-form";
import {useState} from "react";

type Props = {
  employeeId: number
  employeeName: string
}

export function Employee({employeeId, employeeName}: Props) {
  const [isEditing, setIsEditing] = useState(false)

  return <li className="space-x-2">
    {isEditing ? <EditForm
      employeeId={employeeId}
      employeeName={employeeName}
      onSave={() => setIsEditing(false)}
    /> :
      <>
        <span>{employeeId}: {employeeName}</span>
        <button type="submit" onClick={() => setIsEditing(true)}>編集する</button>
        <button type="submit">削除する</button>
      </>
    }
  </li>
}
