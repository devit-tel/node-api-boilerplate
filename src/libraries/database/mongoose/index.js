import mongoose from 'mongoose'
import { createLogger } from '../../logger'

const logger = createLogger('app:database')

export default (uri, options) =>
  new Promise((resolve, reject) => {
    mongoose.connection
      .once('error', error => {
        logger.error('Cannot connect to mongoDB', error)
        reject(error)
      })
      .once('connected', () => {
        logger.error('Connected to mongoDB')
        mongoose.connection
          .off('error')
          .on('error', error => logger.error(error))
          .on('disconnected', () => logger.warn('disconnected'))
          .on('connected', () => logger.info('connected'))
          .on('reconnectFailed', () => logger.warn('reconnect failed'))
        resolve(mongoose.connections[0])
      })

    mongoose.connect(uri, options)
  })
