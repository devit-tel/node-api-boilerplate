import bodyParser from 'koa-bodyparser'

const connectMiddleware = (app) => {
  app.use(bodyParser())
}

export default connectMiddleware
