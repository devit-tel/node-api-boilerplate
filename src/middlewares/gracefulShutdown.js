import { createProbe } from '../libraries/gracefulShutdown'

const probe = createProbe('koa:http')

export default async (ctx, next) => {
  let probeId
  try {
    probeId = probe.setWorker(ctx.request.url)
    await next()
  } finally {
    probe.clearWorker(probeId)
  }
}
