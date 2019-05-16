export const APP_STATES = {
  INITIATING: 'INITIATING',
  READY: 'READY',
  SHUTING_DOWN: 'SHUTING_DOWN',
}

export const APP_STATES_LIST = Object.keys(APP_STATES)

export class AppStatus {
  state = APP_STATES.INITIATING

  constructor(state) {
    this.state = state
  }

  set state(state) {
    if (APP_STATES_LIST.includes(state)) {
      this.state = state
    }
    return this.state
  }

  get state() {
    return this.state
  }
}

export const appStatus = new AppStatus()

export default appStatus
