import rascal from 'rascal'
import { join } from 'path'
import { existsSync } from 'fs-extra'
import config from '../../config'
import filesLoader from '../filesLoader'
import { createLogger } from '../logger'
import { EXIT_CODES } from '../../constants/app'
import { createProbe } from '../gracefulShutdown'
import { libraries } from '../../constants/namespace'

const logger = createLogger(libraries.LIBRARIES_RASCAL_CLIENT)

const SUBSCRIBERS_PATH = join(__dirname, './subscribers')

const probe = createProbe(libraries.LIBRARIES_RASCAL_CLIENT)

let broker

export const getBroker = () => broker

export const reponderMaker = (ackOrNack, subscriptionsName) => ({
  ack: ackOrNack,
  nack: content =>
    ackOrNack(content, {
      strategy: 'forward',
      publication: `${config.system.name}.${subscriptionsName}.error`,
    }),
})

export const publish = (publication, content) =>
  new Promise((resolve, reject) => {
    broker.publish(publication, content, error => {
      if (error) return reject(error)
      return resolve()
    })
  })

export const initHandler = (subscriptionsName, handler) => {
  logger.info(`loading subscriber: "${subscriptionsName}"`)
  broker
    .subscribe(subscriptionsName, (error, subscription) => {
      if (error) {
        logger.error(error)
        process.exit(EXIT_CODES.RASCAL_ERROR)
      }

      subscription
        .on('message', async (message, content, ackOrNack) => {
          const probeId = probe.setWorker(subscriptionsName)
          try {
            await handler(content, reponderMaker(ackOrNack, subscriptionsName), broker)
          } finally {
            probe.clearWorker(probeId)
          }
        })
        .on('invalid_content', (subscriptionError, message, ackOrNack) => {
          ackOrNack(subscriptionError, {
            strategy: 'forward',
            publication: `${config.system.name}.${subscriptionsName}.error`,
          })
        })
        .on('redeliveries_exceeded', (subscriptionError, message, ackOrNack) => {
          ackOrNack(subscriptionError, {
            strategy: 'forward',
            publication: `${config.system.name}.${subscriptionsName}.error`,
          })
        })
        .on('error', subscriptionError => logger.error(subscriptionError))
    })
    .on('error', brokerError => logger.error(brokerError))
}

if (config.clients.rascal.enabled) {
  rascal.Broker.create(rascal.withDefaultConfig(config.clients.rascal), async (error, bk) => {
    if (error) {
      logger.error(error)
      process.exit(EXIT_CODES.RASCAL_ERROR)
    }
    broker = bk
    if (existsSync(SUBSCRIBERS_PATH)) {
      const subscribers = await filesLoader(SUBSCRIBERS_PATH, /.*subscriber\.js$/is)
      for (const { SUBSCRIPTIONS_NAME, handler } of subscribers) {
        if (SUBSCRIPTIONS_NAME && handler) {
          initHandler(SUBSCRIPTIONS_NAME, handler)
        }
      }

      // This is example to simulate publish event please remove
      setTimeout(() => {
        publish(`${config.system.name}.demo`, 'hello world')
      }, 1000)
    }
  })
}

probe.on('shutdown', () => {
  logger.info('Unsubscribe all')
  broker.unsubscribeAll()
})
