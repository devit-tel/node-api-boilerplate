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
import errorHandler from './middlewares/errorHandler'
// import { accessLogger, errorHandler, errorMiddleware, responseFormatter } from './middlewares'

const logger = createLogger({ name: 'app:bootstrap' })
const app = new Koa()
logger.debug('set a middleware to main app')

// Plug "system middlewares"
app.use(bodyParser())
app.use(compress())
app.use(cors())
// app.use(accessLogger())
app.use(errorHandler)
// app.use(responseFormatter())
// app.on('error', errorHandler())
// load router
const apiRouter = load(path.resolve(__dirname, 'controllers'), 'controller.js')
app.use(apiRouter.routes())
app.use(
  apiRouter.allowedMethods({
    throw: true,
    notImplemented: errors.serverError.notImplemented,
    methodNotAllowed: errors.serverError.methodNotAllowed,
  }),
)

const server = app.listen(config.server.port, config.server.host)
logger.debug(`starting server on ${config.server.host}:${config.server.port}`)
gracefulShutdown(server)
