import errors from '../errors'

export default async (ctx, next) => {
  await next()
  if (ctx.status === 404) {
    // console.log('404')
    throw new errors.NotFound('Route not found')
  }
  ctx.body = {
    success: true,
    data: ctx.body,
    error: null,
    requestId: ctx.requestId,
  }
}
