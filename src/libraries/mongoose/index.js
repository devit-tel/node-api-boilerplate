import mongoose from 'mongoose'
import { createLogger } from '../logger'
import config from '../../config'
import { EXIT_CODES } from '../../constants/app'

mongoose.Promise = global.Promise

const logger = createLogger('app:database')

const mongooseConnector = async (uri, options) => {
  await mongoose.connect(uri, options)
  mongoose.connection
    .on('error', logger.error)
    .on('disconnected', () => logger.warn('disconnected'))
    .on('connected', () => logger.info('connected'))
    .on('reconnectFailed', () => logger.warn('reconnect failed'))
}

if (config.clients.mongoDB.enabled) {
  mongooseConnector(config.clients.mongoDB.uri, config.clients.mongoDB.options).catch(error => {
    logger.error(error)
    process.exit(EXIT_CODES.MONGOOSE_ERROR)
  })
}

export default mongooseConnector
