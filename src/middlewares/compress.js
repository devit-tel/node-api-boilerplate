import compress from 'koa-compress'

const connectMiddleware = (app) => {
  app.use(compress())
}

export default connectMiddleware
