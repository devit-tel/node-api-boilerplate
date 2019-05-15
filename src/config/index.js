import 'dotenv/config'
import { name, version } from '../../package.json'

export default {
  system: {
    name,
    version,
    environment: process.env.NODE_ENV,
  },
  clients: {
    mongoDB: {
      url: process.env.MONGODB_URL,
    },
    redis: {
      host: process.env.REDIS_HOST,
    },
    elasticSearch: {
      host: process.env.ES_HOST,
    },
    rabbitMQ: {
      url: process.env.RABBITMQ_URL,
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
        ['x-authorization']: process.env.ADDRESS_HEADERS_AUTHORIZATION,
      },
    },
    google: {
      key: process.env.GOOGLE_MAP_KEY,
    },
  },
  logger: {
    enabled: !!process.env.LOGGER_ENABLED,
    format: !!process.env.LOGGER_FORMAT,
    debug: !!process.env.LOGGER_DEBUG,
    name,
  },
  server: {
    host: process.env.KOA_HOST || '0.0.0.0',
    port: process.env.KOA_PORT || '3000',
  },
}
