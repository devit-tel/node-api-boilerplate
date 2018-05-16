import { middleware } from '../libraries/logger/graylog'

const connectMiddleware = (app) => {
  app.use(middleware)
}

export default connectMiddleware
