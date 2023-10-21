import {notFound} from "next/navigation";

const getProductAndProject = async (projectName: string) => {
  try {
    if (projectName !== 'scrum') {
      throw new Error(`product name は scrum だけ許可されてます: ${projectName}`)
    }
  } catch (e: any) {
    return {product: projectName, project: 'indie', error: e?.message}
  }

  return {product: projectName, project: 'indie'}
}

export default async function ProductPage({params}: {params: { projectName: string }}) {
  const {product, project, error} = await getProductAndProject(params.projectName)
  if (error) {
    notFound()
  }

  return (
    <div>
    <p>{product}</p>
    <p>{project}</p>
    </div>
  )
}
