import Link from "next/link";

export default async function Layout({children}) {
  return (
    <div className="w-full">
      <div className="flex h-full">
        {/* menu */}
        <div className="flex-shrink-0 px-4" style={{ width: 260 }}>
          <ul>
            <li>indie</li>
            <ul className="ml-4">
              <li>
                <Link href="/scrum/indie/team">スクラムチーム</Link>
              </li>
              <li>プロダクトバックログ</li>
              <li>スプリントバックログ</li>
            </ul>
          </ul>
        </div>
        {/* contents */}
        <div className="flex-1 h-full max-w-full px-4">
          {children}
        </div>
      </div>
    </div>
  )
}
