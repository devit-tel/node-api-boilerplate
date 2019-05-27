import R from 'ramda'
import { probes } from '../../libraries/gracefulShutdown'

export default () => R.map(({ state, workers }) => ({ state, workers }), probes)
