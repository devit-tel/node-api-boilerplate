import { createProbe, gracefulShutdown } from '../libraries/gracefulShutdown'
import { STATES } from '../libraries/gracefulShutdown/Probe'

const probe = createProbe('koa:http')

export default async (ctx, next) => {
  const probeId = probe.setWorker(ctx.request.url)
  try {
    await next()
  } finally {
    probe.clearWorker(probeId)
    if (probe.state === STATES.TERMINATING && probe.isReadyToTerminate()) {
      ctx.res.on('finish', gracefulShutdown)
    }
  }
}
