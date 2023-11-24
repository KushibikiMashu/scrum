import { Id } from '@/common'

export class InvalidProjectNameError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export class ProjectId extends Id {
  constructor(public readonly value: number | null) {
    super(value)
  }

  static createAsNull() {
    return new ProjectId(null)
  }

  equals(id: ProjectId) {
    return this.value === id.value
  }
}

export class ProjectName {
  constructor(public readonly value: string) {
    this.validate()
  }

  private validate() {
    if (this.value.length < 1) {
      throw new InvalidProjectNameError('1文字以上入力してください')
    }
  }
}

export class Project {
  constructor(
    public readonly id: ProjectId,
    public readonly name: ProjectName

    // 必要かはわからないのでコメントアウトしておく
    // public readonly product: Product,
    // public readonly team: ScrumTeam,
    // public readonly sprints: Sprint[],
  ) {}

  // pickCurrentSprint(): Sprint
}

export interface ProjectRepositoryInterface {
  fetch(): Promise<Project | null>
  save(project: Project): Promise<Project>
}
