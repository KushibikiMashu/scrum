---
name: 'cli-scenario'
root: '.'
output: 'src/cli/scenario'
ignore: []
questions:
  name: 'Scenario 名を入力してください ex. FooScenario'
---

# `index.ts`

```ts
{{ read output.abs }}
export * from './{{ inputs.name | kebab }}'
```

# `{{ inputs.name | kebab }}.ts`

```ts
import {Employee, EmployeeName, EmployeeRepositoryInterface, ID} from "@panda-project/core";
import {EmployeeRepository} from "@/cli/repository";
import {Logger} from "@/common";

export class {{ inputs.name }}Scenario {
  constructor(
    private readonly validateUseCase: ValidateUseCase = new ValidateUseCase(),
    private readonly {{ inputs.name | camel }}UseCase: {{ inputs.name }}UseCase = new {{ inputs.name }}UseCase(),
    private readonly logger: Logger = console,
  ) {
  }

  async exec(callback: () => Promise<{{ inputs.name }}UserInputType>): Promise<void> {
    try {
      await this.validateUseCase.exec()
    } catch (e: any) {
      this.logger.error(e?.message)
      return
    }

    const input = await callback()

    try {
      await this.{{ inputs.name | camel }}UseCase.exec(new {{ inputs.name }}Input(input))
      this.logger.info(``);
    } catch (e: any) {
      this.logger.error(e?.message)
    }
  }
}

type {{ inputs.name }}UserInputType = {
  
}

class {{ inputs.name }}Input {
  constructor(private readonly input: {{ inputs.name }}UserInputType) {}

  
}

class ValidateUseCase {
  constructor(
    private readonly 
  ) {
  }

  async exec() {

  }
}

class {{ inputs.name }}UseCase {
  constructor(
    private readonly 
  ) {
  }

  async exec(input: {{ inputs.name }}Input) {

  }
}
```
