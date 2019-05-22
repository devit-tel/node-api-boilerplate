import ConductorClient from 'conductor-client'
import { join } from 'path'
import { existsSync } from 'fs-extra'
import config from '../../config'
import filesLoader from '../filesLoader'

const SUBSCRIBERS_PATH = join(__dirname, './workers')

const { enabled, ...conductorConfig } = config.clients

const conductorClient = new ConductorClient(conductorConfig)

if (enabled) {
  if (existsSync(SUBSCRIBERS_PATH)) {
    filesLoader(SUBSCRIBERS_PATH, /.*worker\.js/is)
  }
}

export default conductorClient
