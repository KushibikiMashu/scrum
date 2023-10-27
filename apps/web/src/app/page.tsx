import {InitialForm} from "~/app/initial-form";
import {TopPageQueryService} from "@panda-project/use-case";
import {redirect} from "next/navigation";

export default async function Home() {
  const {data} = await new TopPageQueryService().exec()

  if (data !== null && data.productName !== null) {
    redirect(`/${data.productName}`)
  }

  return (
    <main className="flex flex-col items-center p-24">
      <InitialForm/>
    </main>
  )
}
