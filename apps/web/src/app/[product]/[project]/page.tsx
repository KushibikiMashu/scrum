import {notFound, redirect} from "next/navigation";
import {ProjectPageQueryService, ErrorReason} from "@panda-project/use-case";

type Props =  {
  params: {
    project: string
    product: string
  }
}

export default async function ProductPage({params}: Props) {
  const {data, error} = await new ProjectPageQueryService().exec(
    {product: params.product, project: params.project}
  )

  if (data === null || error?.reason === ErrorReason.ProductNotExists) {
    redirect('/')
  } else if (
    error?.reason === ErrorReason.ProjectNotExists
    // 存在しないプロダクト、プロジェクトの時
    || data.product.name !== params.product
    || data.project.name !== params.project
  ) {
    notFound()
  }

  return (
    <div>
    <p></p>
    <p>a</p>
    </div>
  )
}
