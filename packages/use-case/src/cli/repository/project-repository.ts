import {Project, ProjectRepositoryInterface} from "@panda-project/core";
import {Low} from "lowdb";
import {DataBase, db} from "@/cli/db";
import {AutoIncrementId} from "@/common";

export class ProjectRepository implements ProjectRepositoryInterface {
  constructor(private readonly lowdb: Low<DataBase> = db) {}

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
