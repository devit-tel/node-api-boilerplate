import { EventEmitter } from 'events'

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
    this.workerNumber = 0
    this.workers = new Map()
    this.state = STATES.READY
    this.updatedAt = new Date()
    this.emit(EMIT_EVENTS.INIT)
  }

  setWorker(note) {
    this.workerNumber += 1
    this.workers.set(this.workerNumber, note)
    return this.workerNumber
  }

  clearWorker(workerId) {
    this.workers.delete(workerId)
  }

  isReadyToTerminate() {
    return this.state === STATES.TERMINATED || this.workers.size === 0
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
