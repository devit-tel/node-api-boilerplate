import config from '../config'
import { createLogger } from '../libraries/logger'

const logger = createLogger('app:access')

export default (ctx, next) => {
  next()
  if (config.server.accessLogs) {
    logger.trace({
      request: ctx.request,
      response: ctx.requestId,
    })
  }
}
