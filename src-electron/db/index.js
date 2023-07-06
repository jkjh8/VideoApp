import { app } from 'electron'
import Datastore from 'nedb-promises'
import logger from '../logger'

function dbInit(file) {
  const dbPath = app.getPath('userData')
  logger.info(`db folder: ${dbPath}`)
  return new Datastore({
    filename: `${dbPath}/VideoApp/${file}`,
    timestampData: true,
    autoload: true
  })
}

const db = dbInit('datastore')

export default db
