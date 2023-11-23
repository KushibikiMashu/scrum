import fs from 'node:fs'

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

import { DataBase, defaultData } from './schema'

const cliPathIndex = __dirname.indexOf('/apps/cli')
const webPathIndex = __dirname.indexOf('/apps/web')

if (cliPathIndex === -1 && webPathIndex === -1) {
  throw new Error('DB path not found')
}

const rootIndex = cliPathIndex > 0 ? cliPathIndex : webPathIndex
const basePath = __dirname.slice(0, rootIndex)
const dbFilePath = `${basePath}/db.json`

const adapter = new JSONFile<DataBase>(dbFilePath)
const db = new Low<DataBase>(adapter, defaultData)
const dbFileExists = () => fs.existsSync(dbFilePath)

const createDb = async () => {
  await db.write()
}

const resetDb = async () => {
  const newDb = new Low<DataBase>(adapter, defaultData)
  await newDb.write()
}

export { db, dbFileExists, createDb, resetDb }
