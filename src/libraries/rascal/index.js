import rascal from 'rascal'
import { join } from 'path'
import { existsSync } from 'fs-extra'
import config from '../../config'
import filesLoader from '../filesLoader'
import { createLogger } from '../logger'
import { EXIT_CODES } from '../../constants/app'

const logger = createLogger('app:rascal')

const SUBSCRIBERS_PATH = join(__dirname, './subscribers')

let broker

export const initHandler = (subscriptionsName, handler) => {
  logger.info(`loading subscriber: "${subscriptionsName}"`)
  broker
    .subscribe(subscriptionsName, (error, subscription) => {
      if (error) {
        logger.error(error)
        process.exit(EXIT_CODES.RASCAL_ERROR)
      }
      subscription
        .on('message', (message, content, ackOrNack) => {
          handler(message, ackOrNack, broker)
        })
        .on('invalid_content', (err, message, ackOrNack) => {
          ackOrNack(err, {
            strategy: 'forward',
            publication: `${config.system.name}.${subscriptionsName}.error`,
          })
        })
        .on('redeliveries_exceeded', (err, message, ackOrNack) => {
          ackOrNack(err, {
            strategy: 'forward',
            publication: `${config.system.name}.${subscriptionsName}.error`,
          })
        })
        .on('error', logger.error)
    })
    .on('error', logger.error)
}

if (config.clients.rascal.enabled) {
  rascal.Broker.create(rascal.withDefaultConfig(config.clients.rascal), async (error, bk) => {
    if (error) {
      logger.error(error)
      process.exit(EXIT_CODES.RASCAL_ERROR)
    }
    broker = bk
    if (existsSync(SUBSCRIBERS_PATH)) {
      const subscribers = await filesLoader(SUBSCRIBERS_PATH, /.*subscriber\.js/is)
      for (const { SUBSCRIPTIONS_NAME, handler } of subscribers) {
        if (SUBSCRIPTIONS_NAME && handler) {
          initHandler(SUBSCRIPTIONS_NAME, handler)
        }
      }
    }
  })
}
