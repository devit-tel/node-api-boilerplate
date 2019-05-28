// This is an example file, please remove

import redis from 'redis'
import { createLogger } from '../../../logger'
import { createProbe } from '../../../gracefulShutdown'
import config from '../../../../config'

export const SUBSCRIPTIONS_PATTERN = '__keyspace@0__:*'

const logger = createLogger('app:redis:subscriber')

const probe = createProbe('app:redis:subscriber')

const redisSubscriber = redis.createClient(config.clients.redis)

redisSubscriber.on('pmessage', (pattern, channel, message) => {
  const probeId = probe.setWorker(SUBSCRIPTIONS_PATTERN)
  try {
    console.log(`${message} => ${channel}`)
  } finally {
    probe.clearWorker(probeId)
  }
})
redisSubscriber.psubscribe(SUBSCRIPTIONS_PATTERN)

probe.on('shutdown', () => {
  logger.info(`Unsubscribe ${SUBSCRIPTIONS_PATTERN}`)
  redisSubscriber.unsubscribe()
})
