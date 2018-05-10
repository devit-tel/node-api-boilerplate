import path from 'path'
import Koa from 'koa'
import { load } from '@spksoft/koa-decorator'
import config from './config'
// import mongooseClient from './libraries/database'
import { getLogger } from './libraries/logger'
import { NotFoundError, ErrorCode } from './libraries/error'
import {
  bodyParser,
  compress,
  cors,
  accessLogger,
  errorHandler,
  responseFormatter,
} from './middlewares'

(async () => {
  try {
    const logger = getLogger('app:bootstrap')
    const app = new Koa();
    logger("set a middleware to main app")

    // Plug "system middlewares"
    bodyParser(app)
    compress(app)
    cors(app)
    accessLogger(app)
    errorHandler(app)
    responseFormatter(app)

    // load router
    const apiRouter = load(path.resolve(__dirname, 'controllers'), '.controller.js');
    app.use(apiRouter.routes())
    app.use(apiRouter.allowedMethods({
      throw: true,
      notImplemented: () => new NotFoundError('The resquested uri does not match to any route tables', ErrorCode.URI_NOT_FOUND.CODE),
      methodNotAllowed: () => new NotFoundError('The resquested uri does not match to any route tables', ErrorCode.URI_NOT_FOUND.CODE)
    }))

    // // Connect to database
    // let dbClient = null
    // if (config.database.databaseURL !== undefined && config.database.databaseURI !== null) {
    //   dbClient = await mongooseClient(databaseConfig)
    //   logger(`Connected to ${dbClient.host}:${dbClient.port}/${dbClient.name}`)
    // }

    app.listen(config.system.port)
    logger(`starting server on port ${config.system.port}`)
  } catch (err) {
    console.error('Unable to start server!', err)
  }
})();
