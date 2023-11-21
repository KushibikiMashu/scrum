import {MiddlewareInterface} from "./middleware";
import {dbFileExists} from "@/external/db";

export class CheckDbMiddleware implements MiddlewareInterface {
  constructor(
    private readonly callback: Function,
  ) {
  }

  async run() {
    if (!dbFileExists()) {
      throw new Error('db.json が存在しません。init コマンドを実行してください')
    }
    return await this.callback()
  }
}
