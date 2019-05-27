import { EventEmitter } from 'events'
import R from 'ramda'
import uuid from 'uuid/v4'

export const STATES = {
  READY: 'READY',
  TERMINATING: 'TERMINATING',
  TERMINATED: 'TERMINATED',
}

export const EMIT_EVENTS = {
  INIT: 'init',
  SHUTDOWN: 'shutdown',
  TERMINATED: 'terminated',
}

export default class Probe extends EventEmitter {
  constructor(namespace) {
    super()
    this.namespace = namespace
    this.workers = {}
    this.state = STATES.READY
    this.updatedAt = new Date()
    this.emit(EMIT_EVENTS.INIT)
  }

  setWorker(note) {
    const workerId = uuid()
    this.workers = {
      ...this.workers,
      [workerId]: note,
    }
    return workerId
  }

  clearWorker(workerId) {
    this.workers = R.omit([workerId], this.workers)
  }

  isReadyToTerminate() {
    return this.state === STATES.TERMINATED || Object.keys(this.workers).length === 0
  }

  terminated() {
    this.state = STATES.TERMINATED
    this.updatedAt = new Date()
    this.emit(EMIT_EVENTS.TERMINATED)
  }

  shutdown() {
    this.state = STATES.TERMINATING
    this.updatedAt = new Date()
    this.emit(EMIT_EVENTS.SHUTDOWN, this.terminated)
  }
}
