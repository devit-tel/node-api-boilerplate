import path from 'path'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import cors from '@koa/cors'
import { load } from '@spksoft/koa-decorator'
import gracefulShutdown from 'http-graceful-shutdown'
import config from './config'
import errors from './errors'
import { createLogger } from './libraries/logger'
import requestId from './middlewares/requestId'
import accessLogger from './middlewares/accessLogger'
import errorHandler from './middlewares/errorHandler'
import responseFormatter from './middlewares/responseFormatter'

const logger = createLogger('app:bootstrap')
const app = new Koa()

logger.debug('Setting up middlewares')
app.use(bodyParser())
app.use(compress())
app.use(cors())
app.use(requestId)
app.use(accessLogger)
app.use(errorHandler)
app.use(responseFormatter)

logger.debug('Loading routers')
const apiRouter = load(path.resolve(__dirname, 'controllers'), 'controller.js')
app.use(apiRouter.routes())
app.use(
  apiRouter.allowedMethods({
    throw: true,
    notImplemented: errors.notImplemented,
    methodNotAllowed: errors.methodNotAllowed,
  }),
)

const server = app.listen(config.server.port, config.server.host, undefined, () => {
  logger.debug(`Server started at ${config.server.host}:${config.server.port}`)
})

gracefulShutdown(server)
