import bunyan from 'bunyan'
import bunyanFormat from 'bunyan-format'
import devNull from 'dev-null'
import config from '../../config'

const formatter = bunyanFormat({ outputMode: 'short' })

const { enabled, format, ...loggerConfig } = config.logger

let options = {
  ...loggerConfig,
  serializers: bunyan.stdSerializers,
}

if (!enabled) {
  options = {
    ...options,
    streams: [
      {
        type: 'stream',
        stream: devNull,
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
      },
    ],
  }
}

const logger = bunyan.createLogger(options)

global.logger = logger

export default logger
