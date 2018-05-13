import mongoose from 'mongoose'
import { getLogger } from '../../logger'

const logger = getLogger('app:database')

export default (uri) => new Promise((resolve, reject) => {
  mongoose.connection
    .on('error', error => reject(error))
    .on('close', () => logger("database connection close."))
    .once('open', () => resolve(mongoose.connections[0]))

  mongoose.connect(uri)
})
