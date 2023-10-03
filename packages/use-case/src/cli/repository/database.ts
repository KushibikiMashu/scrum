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

// Read data from JSON file, this will set db.data content
// If JSON file doesn't exist, defaultData is used instead
await db.read()

// If you don't want to type db.data everytime, you can use destructuring assignment
const { posts } = db.data
posts.push('hello world')

// Finally write db.data content to file
await db.write()

db.data.posts.push('foo') // ✅ Success
