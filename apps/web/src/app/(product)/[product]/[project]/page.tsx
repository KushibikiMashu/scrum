import {notFound, redirect} from "next/navigation";
import {ProjectPageQueryService, ErrorReason} from "@panda-project/use-case";
import {assertDefined} from "~/utils";

type Props = {
  params: {
    project: string
    product: string
  }
}

export default async function ProductPage({params}: Props) {
  redirect(`/${params.product}/${params.project}/team`)
}
