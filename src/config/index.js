import uuid from 'uuid/v4'
import { name, version } from '../../package.json'

const replaceVariable = (env, matcher, replacer) =>
  env ? env.replace(matcher, replacer) : undefined

export default {
  system: {
    name,
    version,
    environment: process.env.NODE_ENV,
  },
  clients: {
    mongoDB: {
      enabled: !!process.env.MONGODB_ENABLED,
      uri: replaceVariable(process.env.MONGODB_URL, /\${DATABSE_NAME}/g, name),
      options: {
        database: name,
      },
    },
    redis: {
      host: process.env.REDIS_HOST,
    },
    elasticSearch: {
      host: process.env.ELASTICSEARCH_HOST,
      httpAuth: process.env.ELASTICSEARCH_AUTH,
      apiVersion: process.env.ELASTICSEARCH_API_VERSION || '6.6',
    },
    rabbitMQ: {
      url: replaceVariable(process.env.RABBITMQ_URL, /\${VHOST}/g, process.env.NODE_ENV),
    },
    firebase: {
      url: process.env.FIREBASE_URL,
      key: process.env.FIREBASE_KEY,
      secret: process.env.FIREBASE_SECRET,
    },
    conductor: {
      baseURL: process.env.CONDUCTOR_BASEURL,
    },
  },
  services: {
    address: {
      baseURL: process.env.ADDRESS_BASEURL,
      timeout: 30000,
      headers: {
        'x-authorization': process.env.ADDRESS_HEADERS_AUTHORIZATION,
      },
    },
    google: {
      key: process.env.GOOGLE_MAP_KEY,
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
