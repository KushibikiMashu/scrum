'use client'

import {EditForm} from "./edit-form";
import {useState} from "react";
import {DeleteForm} from "./delete-form";

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
      onCancel={() => setIsEditing(false)}
    /> :
      <div className="flex space-x-2">
        <span>{employeeId}: {employeeName}</span>
        <button type="submit" onClick={() => setIsEditing(true)}>編集</button>
        <DeleteForm employeeId={employeeId} />
      </div>
    }
  </li>
}
