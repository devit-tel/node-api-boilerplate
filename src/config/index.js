import uuid from 'uuid/v4'
import { replaceVariable, splitVariable, enrichRascalCofig } from '../utils/config'
import { name, version } from '../../package.json'

const config = {
  system: {
    name,
    version,
    environment: process.env.NODE_ENV,
  },
  clients: {
    mongoDB: {
      enabled: !!process.env.MONGODB_ENABLED,
      uri: replaceVariable(process.env.MONGODB_URL, /\${DATABSE_NAME}/g, name),
      options: { useCreateIndex: true, useNewUrlParser: true }, // overideOption
    },
    redis: {
      enabled: process.env.REDIS_ENABLED,
      host: process.env.REDIS_HOST,
      db: 0,
    },
    elasticSearch: {
      host: process.env.ELASTICSEARCH_HOST,
      httpAuth: process.env.ELASTICSEARCH_AUTH,
      apiVersion: process.env.ELASTICSEARCH_API_VERSION || '6.6',
    },
    firebase: {
      url: process.env.FIREBASE_URL,
      key: process.env.FIREBASE_KEY,
      secret: process.env.FIREBASE_SECRET,
    },
    conductor: {
      enabled: process.env.CONDUCTOR_ENABLED,
      baseURL: process.env.CONDUCTOR_BASEURL,
      autoAck: true,
      pollingIntervals: 100,
    },
    rascal: {
      enabled: process.env.RASCAL_ENABLED,
      vhosts: {
        [`/${process.env.NODE_ENV}`]: {
          connections: splitVariable(
            replaceVariable(process.env.AMQP_URLS, /\${VHOST}/g, `/${process.env.NODE_ENV}`),
            ',',
          ),
          ...enrichRascalCofig({
            subscriptions: {
              demo: {}, // overide binding options
              anotherDemo: {},
            },
            publications: {
              // A publication name, you can named it what ever you want, in this case is ${serviceName}.${routingKey}
              'node-api-boilerplate.demo': {
                exchange: 'node-api-boilerplate', // The service name that you want to talk to
                routingKey: 'demo', // Their route name
              },
            },
          }),
        },
      },
    },
    google: {
      key: process.env.GOOGLE_MAP_KEY,
    },
    services: {
      address: {
        baseURL: process.env.ADDRESS_BASE_URL,
        headers: {
          'x-authorization': process.env.ADDRESS_AUTHORITIES || '{}',
        },
        timeout: 10000,
      },
    },
  },
  logger: {
    disabled: !!process.env.LOGGER_DISABLED,
    format: !!process.env.LOGGER_FORMAT,
    debug: !!process.env.LOGGER_DEBUG,
    options: {
      project: name,
      v: version,
      environment: process.env.NODE_ENV,
    },
  },
  server: {
    host: process.env.KOA_HOST || '0.0.0.0',
    port: process.env.KOA_PORT || '3000',
    stack: !!process.env.KOA_STACK,
    debug: !!process.env.KOA_DEBUG,
    accessLogs: !!process.env.KOA_ACCESS_LOGS,
    hostname: process.env.HOSTNAME || `${name}:${version}:${process.env.NODE_ENV}`,
    namespace: process.env.KOA_NAMESPACE || uuid(),
  },
}

// console.dir(config, { depth: 10 })

export default config
