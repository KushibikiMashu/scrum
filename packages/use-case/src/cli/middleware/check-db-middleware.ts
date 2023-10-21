import {MiddlewareInterface} from "./middleware";
import {join} from "node:path";
import fs from "node:fs";
import {getDbPath} from "@/gateway";

export class CheckDbMiddleware implements MiddlewareInterface {
  constructor(
    private readonly callback: Function,
  ) {
  }

  async run() {
    const file = getDbPath()
    const dbFileExists = fs.existsSync(file)
    if (!dbFileExists) {
      throw new Error('db.json が存在しません。init コマンドを実行してください')
    }
    return await this.callback()
  }
}
