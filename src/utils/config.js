import R from 'ramda'
import {
  DEFAULT_QUEUE_OPTIONS,
  DEFAULT_EXCHANGE_OPTIONS,
  DEFAULT_QUEUE_ERROR_OPTIONS,
} from '../constants/rascal'
import { name } from '../../package.json'

const reduceIndex = (reducer, initValue) =>
  R.compose(
    R.reduce(reducer, initValue),
    R.toPairs,
  )

export const replaceVariable = (variable, matcher, replacer) =>
  variable ? variable.replace(matcher, replacer) : undefined

export const splitVariable = (variable, splitBy) => (variable ? variable.split(splitBy) : undefined)

const getQueuesConfig = reduceIndex(
  (result, [route]) => ({
    ...result,
    [`${name}.${route}`]: DEFAULT_QUEUE_OPTIONS,
    [`${name}.${route}.error`]: DEFAULT_QUEUE_ERROR_OPTIONS,
  }),
  {},
)

const getSubscriptionsConfig = reduceIndex(
  (result, [route]) => ({
    ...result,
    [route]: {
      queue: `${name}.${route}`,
    },
  }),
  {},
)

const getPublicationsConfig = ({ subscriptions, publications }) => ({
  ...publications,
  ...reduceIndex(
    (result, [route]) => ({
      ...result,
      [`${route}.error`]: { queue: `${route}.error`, autoCreated: true }, // For error
    }),
    {},
    subscriptions,
  ),
})

const getBindingsConfig = reduceIndex(
  (result, [route, config]) => ({
    ...result,
    [`${name}.${route}`]: {
      source: name,
      destination: `${name}.${route}`,
      destinationType: 'queue',
      bindingKey: route,
      ...config,
    },
  }),
  {},
)

const getExchangesConfig = reduceIndex(
  result => ({
    ...result,
    [name]: DEFAULT_EXCHANGE_OPTIONS,
  }),
  {},
)

export const enrichRascalCofig = ({ subscriptions = {}, publications = {}, ...vHost }) => ({
  ...vHost,
  subscriptions: getSubscriptionsConfig(subscriptions),
  publications: getPublicationsConfig({ subscriptions, publications }),
  queues: getQueuesConfig(subscriptions),
  exchanges: getExchangesConfig(subscriptions),
  bindings: getBindingsConfig(subscriptions),
})
