import {ID, Project, ProjectRepositoryInterface} from "@panda-project/core";
import {Low} from "lowdb";
import {DataBase, db} from "../db";
import {AutoIncrementId} from "@/common";

export class ProjectRepository implements ProjectRepositoryInterface {
  constructor(private readonly lowdb: Low<DataBase> = db) {}

  async fetch(): Promise<Project> {
    await this.lowdb.read()
    const { projects } = this.lowdb.data

    if (projects.length === 0) {
      throw new Error('Project が作成されていません')
    }

    return new Project(new ID(projects[0].id), projects[0].name)
  }

  async save(project: Project) {
    await this.lowdb.read()
    const { projects } = this.lowdb.data

    const autoIncrementId = AutoIncrementId.createFromRecords(projects)
    projects.push({
      id: autoIncrementId.value,
      name: project.name,
    })

    await this.lowdb.write()
    return new Project(autoIncrementId, project.name)
  }
}