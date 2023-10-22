import {notFound, redirect} from "next/navigation";
import {ProductPageQueryService} from "@panda-project/use-case";
import Link from "next/link";
import {ResetDbForm} from "./reset-db-form";

// TODO: DB を削除する action を追加する

export default async function ProductPage({params}: { params: { product: string } }) {
  const {data, error} = await new ProductPageQueryService().exec(params.product)

  if (error) {
    notFound()
  } else if (data === null) {
    redirect('/')
  }

  return (
    <div>
      <p>{data.product.name}</p>
      <p>{data.project.name}</p>
      <Link href={`/${data.product.name}/${data.project.name}`}>
        link: {data.project.name}
      </Link>
      <ResetDbForm />
      <Link href="/employees">
        社員一覧
      </Link>
    </div>
  )
}
