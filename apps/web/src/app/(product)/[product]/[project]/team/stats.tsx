const stats = [
  { name: '消化済みポイント', stat: '11（61.1%）' },
  { name: 'キャパシティ', stat: '18' },
  { name: 'ベロシティ', stat: '17.8' },
]

export default function Stats() {
  const today = new Date()
  const sprintStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4)
  const sprintEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3)
  const toYearMonthDay = (date: Date) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  return (
    <div>
      <div className="flex">
        <h3 className="text-base font-semibold leading-6 text-gray-600">スプリント8</h3>
        <span className="text-xs leading-6 text-gray-600">（{toYearMonthDay(sprintStart)} ~ {toYearMonthDay(sprintEnd)}）</span>
      </div>
      <dl className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 border border-gray-300 sm:p-4">
            <dt className="truncate text-xs font-medium text-gray-500">{item.name}</dt>
            <dd className="mt-1 text-2xl tracking-tight text-gray-600">{item.stat}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
