export type DataBase = Documents

// TODO: mermaid 記法の er 図から、schema を自動生成できるといい。
export const defaultData: DataBase = {
  products: [],
  projects: [],
  employees: [],
  members: [],
  scrumMemberRoles: [],
  scrumMembers: [],
  scrumTeams: [],
  productOwners: [],
  scrumMasters: [],
  developers: [],
}

export type Documents = {
  // company
  products: ProductsSchema[]
  projects: ProjectsSchema[]
  employees: EmployeesSchema[]
  members: MembersSchema[]
  // scrum
  scrumMemberRoles: ScrumMemberRolesSchema[]
  scrumMembers: ScrumMembersSchema[]
  scrumTeams: ScrumTeamsSchema[]
  productOwners: ProductOwnersSchema[]
  scrumMasters: ScrumMastersSchema[]
  developers: DevelopersSchema[]
}

export type ProductsSchema = {
  id: number
  name: string
}

export type ProjectsSchema = {
  id: number
  name: string

  product_id: number
  scrum_team_id: number | null
}

export type EmployeesSchema = {
  id: number
  first_name: string
  family_name: string
}

export type MembersSchema = {
  employee_id: number
}

export type ScrumMemberRolesSchema = {
  product_owner: number // "1"
  scrum_master: number // "2"
  developer: number // "3"
}

export type ScrumMembersSchema = {
  member_id: number
  scrum_member_roles_id: number
}

export type ScrumTeamsSchema = {
  id: number

  product_backlog_id: number | null
}

export type ProductOwnersSchema = {
  scrum_team_id: number
  product_owner_id: number // "relation -> Member"
}

export type ScrumMastersSchema = {
  scrum_team_id: number
  scrum_master_id: number // "relation -> Member"
}

export type DevelopersSchema = {
  scrum_team_id: number
  developer_id: number // "relation -> Member"
}
