import { APP_STATES, APP_STATES_LIST } from '../../constants/app'

export class AppStatus {
  constructor(state = APP_STATES.INITIATING) {
    this.appState = state
  }

  set state(state) {
    if (APP_STATES_LIST.includes(state)) {
      this.appState = state
    }
    return this.appState
  }

  get state() {
    return this.appState
  }
}

export const appStatus = new AppStatus()

export default appStatus
