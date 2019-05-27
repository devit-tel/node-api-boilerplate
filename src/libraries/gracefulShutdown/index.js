import Probe, { STATES } from './Probe'
import { createLogger } from '../logger'

const logger = createLogger('koa:middlewares:graceful-shutdown')

export const probes = {}

export const createProbe = namespace => {
  const probe = new Probe(namespace)
  if (probes[namespace]) {
    logger.error(`Probe ${namespace} already exists, please change namespace`)
  } else {
    probes[namespace] = probe
  }

  return probe
}

export const gracefulShutdown = () => {
  const terminatingProbes = probes.filter(probe => {
    if (probe.state === STATES.READY) {
      probe.shutdown()
    }
    return !probe.isReadyToTerminate()
  })
  if (!terminatingProbes.length) {
    process.exit()
  }
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)
