import appStat from './app'
import { APP_STATES } from '../../constants/app'
import Errors from '../../errors'

export default () => {
  if (appStat.state === APP_STATES.SHUTING_DOWN) {
    throw new Errors.ServiceUnavailable('App are shutting down')
  }
  return appStat
}
