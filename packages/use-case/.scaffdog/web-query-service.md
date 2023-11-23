---
name: 'web-query-service'
root: '.'
output: 'src/web/query-service'
ignore: []
questions:
  name: 'QueryService 名を入力してください。QueryServiceという接尾辞は不要です ex. Foo'
---

# `index.ts`

```ts
export * from './{{ inputs.name | kebab }}-query-service'
{{ read output.abs }}
```

# `{{ inputs.name | kebab }}-query-service.ts`

```ts
import {DefaultError, Result} from "@/web/types";

type Dto = {

}

interface CustomError extends DefaultError {

}

class Query {
  constructor(
    private readonly
  ) {
  }


}

export class {{ inputs.name }}QueryService {
  constructor(
    private readonly
  ) {
  }

  async exec(input): Promise<Result<Dto, CustomError>> {
    // validation
    let a = null
    try {
      const userInput = new Query(input)
    } catch (e: unknown) {
      return {
        data: null,
        error: null
      }
    }

    // business logic


    // presentation logic
    return {
      data: {},
      error: null,
    }
  }
}
```
