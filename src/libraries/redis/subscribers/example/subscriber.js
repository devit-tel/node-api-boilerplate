// This is an example file, please remove

import redis from 'redis'
import { createLogger } from '../../../logger'
import { createProbe } from '../../../gracefulShutdown'
import config from '../../../../config'
import { libraries } from '../../../../constants/namespace'

export const SUBSCRIPTIONS_PATTERN = '__keyspace@0__:*'

const logger = createLogger(libraries.LIBRARIES_REDIS_SUBSCRIBER)

const probe = createProbe(libraries.LIBRARIES_REDIS_SUBSCRIBER)

const redisSubscriber = redis.createClient(config.clients.redis)

redisSubscriber.on('pmessage', async (pattern, channel, message) => {
  const probeId = probe.setWorker(SUBSCRIPTIONS_PATTERN)
  try {
    console.log(`${message} => ${channel}`)
    await new Promise(resolve => setTimeout(() => resolve(), 10000))
  } finally {
    probe.clearWorker(probeId)
  }
})
redisSubscriber.psubscribe(SUBSCRIPTIONS_PATTERN)

probe.on('shutdown', async () => {
  logger.info(`Unsubscribe ${SUBSCRIPTIONS_PATTERN}`)
  await redisSubscriber.punsubscribe(SUBSCRIPTIONS_PATTERN)
  logger.info(`Unsubscribe ${SUBSCRIPTIONS_PATTERN}`)
})
