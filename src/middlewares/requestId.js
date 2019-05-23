import uuid from 'uuid/v5'
import config from '../config'

export default (ctx, next) => {
  ctx.requestId = uuid(config.server.hostname, config.server.namespace)
  return next()
}
