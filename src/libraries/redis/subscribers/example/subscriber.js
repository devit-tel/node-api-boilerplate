// This is an example file, please remove

import redis from 'redis'
import { createProbe } from '../../../gracefulShutdown'
import config from '../../../../config'

export const SUBSCRIPTIONS_PATTERN = '__keyspace@0__:*'

const probe = createProbe('rascal:subscribe')

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
