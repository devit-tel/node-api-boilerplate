import cors from '@koa/cors'

const connectMiddleware = (app) => {
  app.use(cors())
}

export default connectMiddleware
