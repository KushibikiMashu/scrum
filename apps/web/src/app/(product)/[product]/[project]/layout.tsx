export default async function Layout({children}) {

  return (
    <div className="w-full">
      <div className="flex h-full">
        <div className="flex-shrink-0" style={{ width: 260 }}>layout</div>
        <div className="flex-1 h-full max-w-full">
          {children}
        </div>
      </div>
    </div>
  )
}
