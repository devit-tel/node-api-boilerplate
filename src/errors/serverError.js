// Server Error 5xx
// Response status codes beginning with the digit "5" indicate cases in which the server is aware that it has erred or is incapable of performing the request. Except when responding to a HEAD request, the server SHOULD include an entity containing an explanation of the error situation, and whether it is a temporary or permanent condition. User agents SHOULD display any included entity to the user. These response codes are applicable to any request method.

export class InternalServerError extends Error {
  constructor(message, code = 'INTERNAL_SERVER_ERROR') {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.isCustomError = true
    this.name = this.constructor.name
    this.code = code
    this.statusCode = 500
  }
}

export const internalServerError = (message, code) => {
  throw new InternalServerError(message, code)
}

export class NotImplemented extends Error {
  constructor(message, code = 'NOT_IMPLEMENTED') {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.isCustomError = true
    this.name = this.constructor.name
    this.code = code
    this.statusCode = 501
  }
}

export const notImplemented = (message, code) => {
  throw new NotImplemented(message, code)
}
