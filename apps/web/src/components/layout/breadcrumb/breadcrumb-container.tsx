import Breadcrumb from "./breadcrumb";
import {BreadcrumbQueryService} from "@panda-project/use-case";

type Props = {
  items?: LinkItem[]
  current: CurrentItem
}

type LinkItem = {
  name: string
  path: string
}

type CurrentItem = {
  name: string
}

export async function BreadcrumbContainer(props: Props) {
  const {data} = await new BreadcrumbQueryService().exec()

  if (!data) {
    return <div>パンくずを表示できません</div>
  }

  const {productName, projectName} = data
  const linkItems: LinkItem[] = [
    {name: projectName, path: `/${productName}`},
    {name: productName, path: `/${productName}/${projectName}`},
    ...props.items?.map((item) => ({name: item.name, path: `/${productName}/${projectName}${item.path}`})) ?? []
  ]

  return <Breadcrumb items={linkItems} current={props.current} />
}
