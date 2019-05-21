import mongoose from 'mongoose'
import { createLogger } from '../logger'
import config from '../../config'
import { EXIT_CODES } from '../../constants/app'

const logger = createLogger('app:database')

const mongooseConnector = (uri, options) =>
  new Promise((resolve, reject) => {
    mongoose.connection
      .once('error', error => {
        logger.error(error)
        reject(error)
      })
      .once('connected', () => {
        logger.info('connected')
        mongoose.connection
          .off('error')
          .on('error', logger.error)
          .on('disconnected', () => logger.warn('disconnected'))
          .on('connected', () => logger.info('connected'))
          .on('reconnectFailed', () => logger.warn('reconnect failed'))
        resolve(mongoose.connections[0])
      })

    mongoose.connect(uri, options)
  })

if (config.clients.mongoDB.enabled) {
  mongooseConnector(config.clients.mongoDB, config.clients.mongoDB.options).catch(() => {
    process.exit(EXIT_CODES.MONGOOSE_ERROR)
  })
}

export default mongooseConnector
