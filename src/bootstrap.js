import path from 'path'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import cors from '@koa/cors'
import mongooseClient from './libraries/database/client/mongoose'
import { load } from '@spksoft/koa-decorator'
import gracefulShutdown from 'http-graceful-shutdown'
import config from './config'
import { getLogger } from './libraries/logger'
import { NotFoundError, ErrorCode } from './libraries/error'
import {
  accessLogger,
  errorHandler,
  errorMiddleware,
  responseFormatter,
} from './middlewares'

(async () => {
  try {
    const logger = getLogger('app:bootstrap')
    const app = new Koa()
    logger('set a middleware to main app')

    // Plug "system middlewares"
    app.use(bodyParser())
    app.use(compress())
    app.use(cors())
    app.use(accessLogger())
    app.use(errorMiddleware())
    app.use(responseFormatter())
    app.on('error', errorHandler())
    // load router
    const apiRouter = load(path.resolve(__dirname, 'controllers'), '.controller.js')
    app.use(apiRouter.routes())
    app.use(apiRouter.allowedMethods({
      throw: true,
      notImplemented: () => new NotFoundError('The resquested uri does not match to any route tables', ErrorCode.URI_NOT_FOUND.CODE),
      methodNotAllowed: () => new NotFoundError('The resquested uri does not match to any route tables', ErrorCode.URI_NOT_FOUND.CODE)
    }))

    // // Connect to database
    let dbClient = null
    if (config.database.databaseURI !== undefined && config.database.databaseURI !== null) {
      dbClient = await mongooseClient(config.database.databaseURI)
      logger(`Connected to ${dbClient.host}:${dbClient.port}/${dbClient.name}`)
    }

    const server = app.listen(config.system.port)
    logger(`starting server on port ${config.system.port}`)
    gracefulShutdown(server)
  } catch (err) {
    console.error('Unable to start server!', err)
  }
})()
