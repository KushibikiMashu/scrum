import {notFound} from "next/navigation";
import {ProductPageQueryService} from "@panda-project/use-case";
import Link from "next/link";

const getProductAndProject = async (productName: string) => {
  try {
    const data = await new ProductPageQueryService().exec(productName)
    return {data, error: null}
  } catch (e: any) {
    return {data: null, error: e?.message}
  }
}

export default async function ProductPage({params}: {params: { productName: string }}) {
  const {data, error} = await getProductAndProject(params.productName)
  if (data === null || error) {
    notFound()
  }

  return (
    <div>
    <p>{data.product.name}</p>
    <p>{data.project.name}</p>
      <Link href={`/${data.product.name}/${data.project.name}`}>
        link: {data.project.name}
      </Link>
    </div>
  )
}
