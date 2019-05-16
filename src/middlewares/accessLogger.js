import R from 'ramda'
import config from '../config'
import { createLogger } from '../libraries/logger'

const logger = createLogger('app:access')

export default (ctx, next) => {
  next()
  if (config.server.accessLogs) {
    logger.trace({
      request: {
        ...R.pick(['method', 'url', 'headers', 'body'], ctx.request),
      },
      requestId: ctx.requestId,
    })
  }
}
