import {join} from 'node:path'

import {Low} from 'lowdb'
import {JSONFile} from 'lowdb/node'
import {DataBase} from "./schema";

const file = join(__dirname, '../../../apps/cli/db.json')

const defaultData: DataBase = {posts: []}
const adapter = new JSONFile<DataBase>(file)
const db = new Low<DataBase>(adapter, defaultData)

export {db}
