import {notFound, redirect} from "next/navigation";
import {ProjectPageQueryService, ErrorReason} from "@panda-project/use-case";

type Props = {
  params: {
    project: string
    product: string
  }
}

const redirectOnError = ({data, error}) => {
  const to404 = error?.reason === ErrorReason.InvalidProductName
    || error?.reason === ErrorReason.InvalidProjectName
    || error?.reason === ErrorReason.ProjectNotExists
  const redirectToTop = data === null
    || error?.reason === ErrorReason.ProductNotExists
    || error?.reason === ErrorReason.UnknownError

  if (to404) {
    notFound()
  } else if (redirectToTop) {
    redirect('/')
  }
}

export default async function ProductPage({params}: Props) {
  const {data, error} = await new ProjectPageQueryService().exec(
    {product: params.product, project: params.project}
  )
  redirectOnError({data, error})

  return (
    <div>
      <p></p>
      <p>a</p>
    </div>
  )
}
