import { Fragment } from 'react'

const stories = [
  {
    name: 'ブログを読む人がコメントできる',
    point: 9,
    people: [
      { title: 'コメントフォームを作成する', assignee: '竹内 太一',  status: '完了', point: '4' },
      { title: 'APIを定義する', assignee: '佐々木 空',  status: 'Doing', point: '1' },
      { title: 'バックエンドを実装する', assignee: '藤本 楓',  status: 'TODO', point: '4' },
    ],
  },
  {
    name: 'ブログの著者が下書きを作成できる',
    point: 9,
    people: [
      { title: '保存ボタンを作成する', assignee: '竹内 太一', status: 'TODO', point: '2' },
      { title: 'APIを定義する', assignee: '佐々木 空', status: '完了', point: '1' },
      { title: 'テーブル定義をする', assignee: '藤本 楓', status: '完了', point: '1' },
      { title: 'ユースケースを実装する', assignee: '藤本 楓', status: '完了', point: '5' },
    ],
  },
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function TaskList() {
  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h3 className="text-base font-semibold leading-6 text-gray-700">Stories & Tasks</h3>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="text-xs border border-gray-300 hover:bg-gray-50 rounded-md px-3 py-2"
          >
            Storyを追加
          </button>
        </div>
      </div>
      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-6">
            <table className="min-w-full">
              <thead className="bg-white sr-only">
              <tr>
                <th>
                  タイトル
                </th>
                <th>
                  担当者
                </th>
                <th>
                  ステータス
                </th>
                <th>
                  ポイント数
                </th>
                <th>
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
              </thead>
              <tbody className="bg-white">
              {stories.map((story) => (
                <Fragment key={story.name}>
                  <tr className="border-t border-gray-200">
                    <th
                      colSpan={5}
                      scope="colgroup"
                      className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                    >
                      <div className="space-x-2">
                        <span>{story.name}</span>
                        <span className="text-xs font-medium">（{story.point}ポイント）</span>
                      </div>
                    </th>
                  </tr>
                  {story.people.map((person, personIdx) => (
                    <tr
                      key={personIdx}
                      className={classNames(personIdx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">{person.title}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.assignee}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.status}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.point}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                        <button
                          type="button"
                          className="text-xs border border-gray-300 hover:bg-gray-50 rounded-md px-2.5 py-1.5"
                        >
                          編集する
                        </button>
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
