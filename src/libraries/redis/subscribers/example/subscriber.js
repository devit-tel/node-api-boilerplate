import redis from 'redis'
import config from '../../../../config'

const redisSubscriber = redis.createClient(config.clients.redis)

redisSubscriber.on('pmessage', (pattern, channel, message) => {
  console.log(`${message} => ${channel}`)
})
redisSubscriber.psubscribe('__keyspace@0__:*')
