import mongoose from 'mongoose'
import { createLogger } from '../../logger'

const logger = createLogger('app:database')

export default uri =>
  new Promise((resolve, reject) => {
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => logger('database connection close.'))
      .once('open', () => resolve(mongoose.connections[0]))

    mongoose.connect(uri)
  })
