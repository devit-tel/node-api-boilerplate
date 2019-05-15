import path from 'path'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import cors from '@koa/cors'
import { load } from '@spksoft/koa-decorator'
import gracefulShutdown from 'http-graceful-shutdown'
import mongooseConnect from './libraries/database/mongoose'
import config from './config'
import { createLogger } from './libraries/logger'
import errors from './errors'
// import { accessLogger, errorHandler, errorMiddleware, responseFormatter } from './middlewares'

const logger = createLogger({ namespace: 'app:bootstrap' })
const app = new Koa()
logger.debug('set a middleware to main app')

// Plug "system middlewares"
app.use(bodyParser())
app.use(compress())
app.use(cors())
// app.use(accessLogger())
// app.use(errorMiddleware())
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

if (config.clients.mongoDB.enabled) {
  mongooseConnect(config.clients.mongoDB.uri, config.clients.mongoDB.options).catch(() => {
    process.exit(1)
  })
}

const server = app.listen(config.server.port, config.server.host)
logger.debug(`starting server on ${config.server.host}:${config.server.port}`)
gracefulShutdown(server)
