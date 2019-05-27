import R from 'ramda'
import { probes } from '../../libraries/gracefulShutdown'

export default () =>
  R.map(
    ({ state, workers, updatedAt }) => ({
      state,
      workers: Array.from(workers).map(([key, note]) => note),
      updatedAt,
    }),
    probes,
  )
