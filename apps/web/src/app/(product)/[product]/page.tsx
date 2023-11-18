import {notFound, redirect} from "next/navigation";
import {ProductPageQueryService} from "@panda-project/use-case";
import {ProjectList} from "./project-list";

export default async function ProductPage({params}: { params: { product: string } }) {
  const {data, error} = await new ProductPageQueryService().exec(params.product)

  if (error) {
    notFound()
  } else if (data === null) {
    redirect('/')
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
      {data.scrumTeam ?
        <div>
          <ProjectList projects={[
            {
              name: data.project.name,
              product: {name: data.product.name},
              scrumTeam: data.scrumTeam
            }
          ]}/>
        </div>
        : <div>
          {/* TODO: スタイリングする */}
          スクラムチームを作成してください
        </div>
      }
    </div>
  )
}
