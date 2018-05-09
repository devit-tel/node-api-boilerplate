import Router from 'koa-router';
import exampleRouter from './example/router'
const router = new Router()

router.use('/example', exampleRouter.routes())

export default router
