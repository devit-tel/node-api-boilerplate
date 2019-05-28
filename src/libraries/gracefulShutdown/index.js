import R from 'ramda'
import Probe, { STATES } from './Probe'
import { createLogger } from '../logger'

const logger = createLogger('koa:middlewares:graceful-shutdown')

export const probes = {}

export const createProbe = namespace => {
  if (!probes[namespace]) {
    const probe = new Probe(namespace)
    probes[namespace] = probe
    return probe
  }

  return probes[namespace]
}

export const gracefulShutdown = () => {
  const terminatingProbes = R.filter(probe => {
    if (probe.state === STATES.READY) {
      probe.shutdown()
    }
    return !probe.isReadyToTerminate()
  }, probes)
  if (!Object.keys(terminatingProbes).length) {
    process.exit()
  }
}

process.on('SIGTERM', gracefulShutdown)
// process.on('SIGINT', gracefulShutdown)
