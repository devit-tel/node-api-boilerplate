const middleware = (ctx, next) => {
  next();
  // @todo implement formatter when have more time
}
const connectMiddleware = (app) => {
  app.use(middleware)
}

export default connectMiddleware
