export default async (ctx, next) => {
  await next()
  ctx.body = {
    success: true,
    data: ctx.body,
    error: null,
    requestId: ctx.requestId,
  }
}
