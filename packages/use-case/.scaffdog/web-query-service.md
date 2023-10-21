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

export class {{ inputs.name }}QueryService {
  constructor(
    private readonly 
  ) {
  }

  async exec(): Promise<Result<Dto, CustomError>> {
    return {
      data: {},
      error: null,
    }
  }
}
```
