import appStatus, { APP_STATES } from './app'

export default () => {
  if (appStatus.state === APP_STATES.SHUTING_DOWN) {
    throw new Error
  }
}
