'use client'

import { Fragment, useEffect, useState } from 'react'
import EditForm from './edit-form'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import DeleteForm from './delete-form'
import { EmployeeListQueryServiceDto } from '@panda-project/use-case'
import { useToastDispatch } from '~/components/global/toast'
import { useFormState, useFormStatus } from 'react-dom'
import { deleteEmployee } from './actions'
import { classNames } from '~/utils'

type Props = { employee: EmployeeListQueryServiceDto['employees'][number] }

export default function Employee({ employee }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const { showToast } = useToastDispatch()

  const [deleteState, deleteAction] = useFormState(deleteEmployee, {
    type: null,
    errors: null,
  })
  const onSubmit = async (formData: FormData) => {
    const answer = confirm('本当に削除しますか？')
    if (answer) {
      await deleteAction(formData)
    }
  }

  useEffect(() => {
    if (deleteState.type === 'success') {
      showToast({
        icon: 'success',
        heading: '社員を削除しました',
      })
    } else if (deleteState.type === 'error') {
      showToast({
        icon: 'error',
        heading: deleteState.errors,
      })
    }
  }, [deleteState, showToast])

  return (
    <li className={classNames('flex justify-between', isEditing ? 'py-3.5' : 'py-5')}>
      {/* employee */}
      {isEditing ? (
        <EditForm
          employeeId={employee.id}
          employeeName={employee.name}
          onSave={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm leading-6 text-gray-900">
                {employee.id}: {employee.name}
              </p>
            </div>
          </div>
          {/* menu */}
          <div className="flex shrink-0 items-center gap-x-6">
            <Menu as="div" className="relative flex-none">
              <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'w-full text-left block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                        onClick={() => setIsEditing(true)}
                      >
                        編集する
                        <span className="sr-only">, {employee.name}</span>
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => <DeleteForm employeeId={employee.id} active={active} onSubmit={onSubmit} />}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </>
      )}
    </li>
  )
}
