import {ID} from "@/common";

export class InvalidProjectNameError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export class ProjectName {
  constructor(
    public readonly value: string
  ) {
    this.validate()
  }

  equals(other: ProjectName): boolean {
    return this.value === other.value
  }

  private validate() {
    if (this.value.length < 1) {
      throw new InvalidProjectNameError('1文字以上入力してください')
    }
  }
}

export class Project {
  constructor(
    public readonly id: ID,
    public readonly name: ProjectName,

    // 必要かはわからないのでコメントアウトしておく
    // public readonly product: Product,
    // public readonly team: ScrumTeam,
    // public readonly sprints: Sprint[],
  ) {
  }

  // pickCurrentSprint(): Sprint
}

export interface ProjectRepositoryInterface {
  fetch(): Promise<Project|null>
  save(project: Project): Promise<Project>
}
