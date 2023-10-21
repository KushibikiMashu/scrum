import {ID, Project, ProjectName, ProjectRepositoryInterface} from "@panda-project/core";
import {Low} from "lowdb";
import {DataBase, db} from "../db";
import {AutoIncrementId} from "@/common";

export class ProjectRepository implements ProjectRepositoryInterface {
  constructor(private readonly lowdb: Low<DataBase> = db) {}

  async fetch(): Promise<Project|null> {
    await this.lowdb.read()
    const { projects } = this.lowdb.data

    if (projects.length === 0) {
      return null
    }

    return new Project(new ID(projects[0].id), new ProjectName(projects[0].name))
  }

  async save(project: Project) {
    await this.lowdb.read()
    const { projects } = this.lowdb.data

    const autoIncrementId = AutoIncrementId.createFromRecords(projects)
    projects.push({
      id: autoIncrementId.value,
      name: project.name.value,
    })

    await this.lowdb.write()
    return new Project(autoIncrementId, project.name)
  }
}
