import R from 'ramda'
import config from '../config'

export default async (ctx, next) => {
  try {
    await next()
  } catch ({ isCustomError, statusCode, code, message, stack }) {
    if (isCustomError) {
      ctx.status = statusCode
    } else {
      ctx.status = 500
    }
    ctx.body = {
      success: false,
      data: null,
      error: {
        code,
        message,
        stack: config.server.stack ? stack : undefined,
        debug: config.server.debug
          ? {
              ...R.pick(['method', 'url', 'headers', 'body'], ctx),
              query: ctx.query,
              params: ctx.params,
            }
          : undefined,
      },
    }
  }
}
