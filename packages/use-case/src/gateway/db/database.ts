import {Low} from 'lowdb'
import {JSONFile} from 'lowdb/node'
import {DataBase, defaultData} from "./schema";
import fs from "node:fs";

const paths = __dirname.split('/')
const cliPathIndex = paths.findIndex(item => item === '/apps/cli')
const webPathIndex = paths.findIndex(item => item === '/apps/web')

const getDbPath = () => {
  const index = __dirname.includes('/cli') ? cliPathIndex : webPathIndex
  return paths.slice(0, index - 2).concat(['db.json']).join('/')
}

const file = getDbPath()
const adapter = new JSONFile<DataBase>(getDbPath())
const db = new Low<DataBase>(adapter, defaultData)
const dbFileExists = fs.existsSync(file)

export {db, dbFileExists}
