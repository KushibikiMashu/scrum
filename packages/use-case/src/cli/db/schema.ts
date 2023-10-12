export type DataBase = Documents

// TODO: mermaid 記法の er 図から、schema を自動生成できるといい。
export const defaultData: DataBase = {
  products: [],
  projects: [],
  employees: [],
  members: [],
  scrumMemberRoles: {
    1: "product_owner",
    2: "scrum_master",
    3: "developer",
  },
  scrumTeams: [],
  productOwners: [],
  scrumMasters: [],
  developers: [],
}

export type Documents = {
  // company
  products: ProductsSchema
  projects: ProjectsSchema
  employees: EmployeesSchema
  members: MembersSchema
  // scrum
  scrumMemberRoles: ScrumMemberRolesSchema
  scrumTeams: ScrumTeamsSchema
  productOwners: ProductOwnersSchema
  scrumMasters: ScrumMastersSchema
  developers: DevelopersSchema
}

export type ProductsSchema = {
  id: number
  name: string
}[]

export type ProjectsSchema = {
  id: number
  name: string

  // 必要になったらコメントアウトをとる
  // product_id: number
  // scrum_team_id: number | null
}[]

export type EmployeesSchema = {
  id: number
  first_name: string
  family_name: string
}[]

export type MembersSchema = {
  employee_id: number
}[]

export type ScrumMemberRolesSchema = {
  1: "product_owner",
  2: "scrum_master",
  3: "developer",
}

export type ScrumTeamsSchema = {
  id: number

  product_backlog_id: number | null
}[]
// increments, product_goals のリレーションを作成できる

export type ProductOwnersSchema = {
  scrum_team_id: number
  employee_id: number // "relation -> Employee"
}[]

export type ScrumMastersSchema = {
  scrum_team_id: number
  employee_id: number // "relation -> Employee"
}[]

export type DevelopersSchema = {
  id: number
  scrum_team_id: number
  employee_id: number // "relation -> Employee"
}[]
