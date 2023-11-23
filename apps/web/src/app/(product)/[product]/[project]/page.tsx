import { redirect } from 'next/navigation'

type Props = {
  params: {
    project: string
    product: string
  }
}

export default async function ProductPage({ params }: Props) {
  redirect(`/${params.product}/${params.project}/team`)
}
