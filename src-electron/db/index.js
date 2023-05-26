import { app } from 'electron'
import Datastore from 'nedb-promises'

function dbInit(file) {
  const dbPath = app.getPath('userData')
  return new Datastore({
    filename: `${dbPath}/VideoApp/${file}`,
    timestampData: true,
    autoload: true
  })
}

const db = dbInit('datastore')

export default db
