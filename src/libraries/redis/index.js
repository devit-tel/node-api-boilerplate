import redis from 'redis'
import { join } from 'path'
import { existsSync } from 'fs-extra'
import { promisifyAll } from 'bluebird'
import config from '../../config'
import filesLoader from '../filesLoader'

const SUBSCRIBERS_PATH = join(__dirname, './subscribers')

const redisPromise = promisifyAll(redis)

if (existsSync(SUBSCRIBERS_PATH)) {
  filesLoader(SUBSCRIBERS_PATH, /.*subscriber\.js/is)
}

export default redisPromise.createClient(config.clients.redis)
