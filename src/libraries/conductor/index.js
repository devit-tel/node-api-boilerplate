import ConductorClient from 'conductor-client'
import { join } from 'path'
import { existsSync } from 'fs-extra'
import config from '../../config'
import { libraries } from '../../constants/namespace'
import filesLoader from '../filesLoader'
import { createProbe } from '../gracefulShutdown'
import { createLogger } from '../logger'

const logger = createLogger(libraries.LIBRARIES_CONDUCTOR_CLIENT)
const probe = createProbe(libraries.LIBRARIES_CONDUCTOR_CLIENT)

const SUBSCRIBERS_PATH = join(__dirname, './workers')

const { enabled, ...conductorConfig } = config.clients.conductor

const conductorClient = new ConductorClient(conductorConfig)

export const registerWatcher = (taskType, callback, options, startPolling) =>
  conductorClient.registerWatcher(
    taskType,
    async (...args) => {
      const probeId = probe.setWorker(taskType)
      try {
        await callback(...args)
      } finally {
        probe.clearWorker(probeId)
      }
    },
    options,
    startPolling,
  )

if (enabled) {
  if (existsSync(SUBSCRIBERS_PATH)) {
    filesLoader(SUBSCRIBERS_PATH, /.*worker\.js/is)
  }
}

probe.on('shutdown', () => {
  logger.info('Stop polling all')
  conductorClient.stopPolling()
})

export default conductorClient
