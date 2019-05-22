import errors from '../errors'

export default async (ctx, next) => {
  await next()
  if (ctx.status === 404) throw new errors.NotImplemented('Route not found')
  ctx.body = {
    success: true,
    data: ctx.body,
    error: null,
    requestId: ctx.requestId,
  }
}
