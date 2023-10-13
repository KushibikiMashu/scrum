import {join} from 'node:path'

import {Low} from 'lowdb'
import {JSONFile} from 'lowdb/node'
import {DataBase, defaultData} from "./schema";

const relativePath = __dirname.includes('/cli') ?
  '../../../apps/cli/db.json' : '../../../../../apps/cli/db.json'
const file = join(__dirname, relativePath)

const adapter = new JSONFile<DataBase>(file)
const db = new Low<DataBase>(adapter, defaultData)

export {db}
