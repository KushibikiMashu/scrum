import {Low} from 'lowdb'
import {JSONFile} from 'lowdb/node'
import {DataBase, defaultData} from "./schema";

const paths = __dirname.split('/')
const cliPathIndex = paths.findIndex(item => item === 'cli')
const webPathIndex = paths.findIndex(item => item === 'web')

export const getDbPath = () => {
  const index = __dirname.includes('/cli') ? cliPathIndex : webPathIndex
  return paths.slice(0, index - 1).concat(['db.json']).join('/')
}

const adapter = new JSONFile<DataBase>(getDbPath())
const db = new Low<DataBase>(adapter, defaultData)

export {db}
