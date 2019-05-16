import redis from 'redis'
import { promisifyAll } from 'bluebird'
import config from '../../../config'

const redisClient = promisifyAll(redis.createClient(config.redis))

export default redisClient
