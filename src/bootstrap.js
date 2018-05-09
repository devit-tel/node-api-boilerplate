import dotenvConfig from 'dotenv/config' // Only on top
import Koa from 'koa';
import config from './config';
import mongooseClient from './libraries/database'
import router from './router'
import { getLogger } from './libraries/logger'
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
    bodyParser(app)
    compress(app)
    cors(app)
    accessLogger(app)
    errorHandler(app)
    responseFormatter(app)
    router(app)
    let dbClient = null
    if (config.database.databaseURL !== undefined && config.database.databaseURI !== null) {
      dbClient = await mongooseClient(databaseConfig)
      logger(`Connected to ${dbClient.host}:${dbClient.port}/${dbClient.name}`)
    }
    app.listen(config.system.port)
    logger(`starting server on port ${config.system.port}`)
  } catch (err) {
    console.error('Unable to start server!', err)
  }
})();
