import {InitialForm} from "~/app/initial-form";
import {CheckDbMiddleware, TopPageQueryService} from "@panda-project/use-case";

// async function execUseCase<T>(callback: () => Promise<T>): Promise<
//   { data: T, error: null }
//   | { data: null, error: string }
// > {
//   try {
//     const data = await callback()
//     return {data, error: null}
//   } catch (e: any) {
//     return {data: null, error: e?.message}
//   }
// }

export default async function Home() {
  // const {data, error} = await execUseCase(
  //   async () => await new TopPageQueryService().exec()
  // )
  const {data, error} = {}
  console.log(data, error);

  if (error) {
    return <div>
      <p>DBが存在しません。プロジェクトルートに json ファイルを作成して、DBとして扱います</p>
      <button>DBを作成する</button>
    </div>
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {data?.existsProduct &&
        <div className="pb-24">
          <p>DBをリセットしますか？</p>
          <button>リセットする</button>
        </div>
      }

      <InitialForm/>
    </main>
  )
}
