import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import {DataBase} from "./schema";

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'db.json')

const defaultData: DataBase = { posts: [] }
const adapter = new JSONFile<DataBase>(file)
const db = new Low<DataBase>(adapter, defaultData)

export { db }
