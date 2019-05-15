import bunyan from 'bunyan'
import bunyanFormat from 'bunyan-format'
import devNull from 'dev-null'
import config from '../../config'

const formatter = bunyanFormat({ outputMode: 'short' })

const { disabled, format, debug } = config.logger

export const createLogger = overrideOptions => {
  let options = {
    serializers: bunyan.stdSerializers,
    ...config.system,
    ...overrideOptions,
  }

  if (disabled) {
    options = {
      ...options,
      streams: [
        {
          type: 'stream',
          stream: devNull(),
          level: bunyan.TRACE,
        },
      ],
    }
  } else if (format) {
    options = {
      ...options,
      streams: [
        {
          type: 'stream',
          stream: formatter,
          level: bunyan.INFO,
        },
        {
          type: 'stream',
          stream: debug ? formatter : devNull(),
          level: bunyan.TRACE,
        },
      ],
    }
  } else {
    options = {
      ...options,
      streams: [
        {
          type: 'stream',
          stream: process.stdout,
          level: bunyan.INFO,
        },
        {
          type: 'stream',
          stream: debug ? process.stdout : devNull(),
          level: bunyan.TRACE,
        },
      ],
    }
  }

  return bunyan.createLogger(options)
}

const logger = createLogger({ namespace: 'system' })

global.logger = logger

export default logger

// log.trace('hi on trace')
// log.debug('hi on debug')   // console.log
// log.info('hi on info')     // console.info
// log.warn('hi on warn')     // console.warn
// log.error('hi on error')   // console.error
