import { probes } from '../../libraries/gracefulShutdown'
import { STATES } from '../../libraries/gracefulShutdown/Probe'
import errors from '../../errors'

export default () => {
  if (probes['koa:http'].state !== STATES.READY) {
    throw new errors.ServiceUnavailable('Server terminating')
  }
  return 'OK'
}
