import Router from 'koa-router';
import { NotFoundError, ErrorCode } from './libraries/error'
import apiV1Router from './controllers/v1/router'
import systemRouter from './controllers/system/router'

const router = new Router();

router.use('/system', systemRouter.routes())
router.use('/api/v1', apiV1Router.routes())

const connectMiddleware = (app) => {
  app.use(router.routes())
  app.use(router.allowedMethods({
    throw: true,
    notImplemented: () => new NotFoundError('The resquested uri does not match to any route tables', ErrorCode.URI_NOT_FOUND.CODE),
    methodNotAllowed: () => new NotFoundError('The resquested uri does not match to any route tables', ErrorCode.URI_NOT_FOUND.CODE)
  }))
}

export default connectMiddleware
