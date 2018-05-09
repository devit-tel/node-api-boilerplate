import dotenvConfig from 'dotenv/config'
import Koa from 'koa';
import config from './config';
import { getLogger } from './libraries/logger'
import router from './router'
import {
  bodyParser,
  compress,
  cors,
  accessLogger,
  errorHandler,
  responseFormatter,
} from './middlewares'

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
app.listen(config.system.port)
logger(`starting server on port ${config.system.port}`)
