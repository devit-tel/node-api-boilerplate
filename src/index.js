import 'babel-polyfill'
import './errors'
import logger from './libraries/logger'
import './bootstrap'

logger.trace('Log "trace" enabled')
logger.debug('Log "debug" enabled')
logger.info('Log "info" enabled')
logger.warn('Log "warn" enabled')
logger.error('Log "error" enabled')
