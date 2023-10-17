import {MiddlewareInterface} from "./middleware";
import {join} from "node:path";
import fs from "node:fs";

export class CheckDbMiddleware implements MiddlewareInterface {
  constructor(
    private readonly callback: Function,
    private readonly path = '../.././../'
  ) {
  }

  async run() {
    const file = join(__dirname, this.path, 'db.json')
    const dbFileExists = fs.existsSync(file)
    if (!dbFileExists) {
      throw new Error('db.json が存在しません。init コマンドを実行してください')
    }
    return this.callback();
  }
}
