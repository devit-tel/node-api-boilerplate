import ConductorClient from 'conductor-client'
import { join } from 'path'
import { existsSync } from 'fs-extra'
import config from '../../config'
import filesLoader from '../filesLoader'
import { createProbe } from '../gracefulShutdown'
import { createLogger } from '../logger'

const logger = createLogger('app:conductor')
const probe = createProbe('app:conductor')

const SUBSCRIBERS_PATH = join(__dirname, './workers')

const { enabled, ...conductorConfig } = config.clients.conductor

const conductorClient = new ConductorClient(conductorConfig)

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
