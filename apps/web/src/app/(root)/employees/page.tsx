import AddForm from './add-form'
import EmployeeList from './employee-list'

export default async function EmployeesPage() {
  return (
    <div className="max-w-sm">
      <AddForm />

      <div className="mt-6">
        <EmployeeList />
      </div>
    </div>
  )
}
