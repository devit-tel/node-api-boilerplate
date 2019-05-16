import bunyan from 'bunyan'
import bunyanFormat from 'bunyan-format'
import devNull from 'dev-null'
import config from '../../config'

const formatter = bunyanFormat({ outputMode: 'short' })

const { disabled, format, debug } = config.logger

export const createLogger = name => {
  let options = {
    serializers: bunyan.stdSerializers,
    name: name || 'default',
    ...config.logger.options,
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
          level: debug ? bunyan.TRACE : bunyan.INFO,
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
          level: debug ? bunyan.TRACE : bunyan.INFO,
        },
      ],
    }
  }

  return bunyan.createLogger(options)
}

const logger = createLogger('app:default')

global.logger = logger

export default logger

// log.trace('hi on trace')
// log.debug('hi on debug')   // console.log
// log.info('hi on info')     // console.info
// log.warn('hi on warn')     // console.warn
// log.error('hi on error')   // console.error
