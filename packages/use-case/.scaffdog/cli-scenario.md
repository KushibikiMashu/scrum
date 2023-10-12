---
name: 'cli-scenario'
root: '.'
output: 'src/cli/scenario'
ignore: []
questions:
  name: 'Scenario 名を入力してください。Scenarioという接尾辞は不要です ex. Foo'
---

# `index.ts`

```ts
export * from './{{ inputs.name | kebab }}-scenario'
{{ read output.abs }}
```

# `{{ inputs.name | kebab }}-scenario.ts`

```ts
import {Logger} from "@/common";

export type {{ inputs.name }}CallbackArg = {}

export class {{ inputs.name }}Scenario {
  constructor(
    private readonly validateUseCase: ValidateUseCase = new ValidateUseCase(),
    private readonly {{ inputs.name | camel }}UseCase: {{ inputs.name }}UseCase = new {{ inputs.name }}UseCase(),
    private readonly logger: Logger = console,
  ) {
  }

  async exec(callback: (arg: {{ inputs.name }}CallbackArg) => Promise<{{ inputs.name }}UserInputType>): Promise<void> {
    try {
      await this.validateUseCase.exec()
      const input = await callback()
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
  constructor(private readonly userInput: {{ inputs.name }}UserInputType) {}

  
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
