export const APP_STATES = {
  INITIATING: 'INITIATING',
  READY: 'READY',
  SHUTING_DOWN: 'SHUTING_DOWN',
}

export const APP_STATES_LIST = Object.keys(APP_STATES)

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
