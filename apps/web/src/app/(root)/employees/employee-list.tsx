'use client'

import {Fragment, useState} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {EllipsisVerticalIcon} from '@heroicons/react/20/solid'
import {EmployeesPageQueryServiceDto} from "@panda-project/use-case";
import {DeleteForm} from "~/app/(root)/employees/delete-form";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

type Props = Pick<EmployeesPageQueryServiceDto, 'employees'>

export default function EmployeeList({employees}: Props) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div>
      <h2 className="text-base font-semibold leading-6 text-gray-600">社員一覧</h2>
      <ul role="list" className="mt-2 w-full lg:w-3/5 divide-y divide-gray-100">
        {employees.map((employee, i) => (
          <li key={i} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm leading-6 text-gray-900">
                  {employee.name}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-6">
              <Menu as="div" className="relative flex-none">
                <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true"/>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      {({active}) => (
                        <button
                          className={classNames(
                            active ? 'bg-gray-50' : '',
                            'w-full text-left block px-3 py-1 text-sm leading-6 text-gray-900'
                          )}
                          onClick={() => setIsEditing(true)}
                        >
                          編集する<span className="sr-only">, {employee.name}</span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({active}) => (
                        <DeleteForm employeeId={employee.id} active={active} />
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
