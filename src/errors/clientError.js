// Client Error 4xx
// The 4xx class of status code is intended for cases in which the client seems to have erred. Except when responding to a HEAD request, the server SHOULD include an entity containing an explanation of the error situation, and whether it is a temporary or permanent condition. These status codes are applicable to any request method. User agents SHOULD display any included entity to the user.
// If the client is sending data, a server implementation using TCP SHOULD be careful to ensure that the client acknowledges receipt of the packet(s) containing the response, before the server closes the input connection. If the client continues sending data to the server after the close, the server's TCP stack will send a reset packet to the client, which may erase the client's unacknowledged input buffers before they can be read and interpreted by the HTTP application.

export class BadRequest extends Error {
  constructor(message: string, code = 'BAD_REQUEST') {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.isCustomError = true
    this.name = this.constructor.name
    this.data = data
    this.code = code
    this.statusCode = 400
  }
}

export class Unauthorized extends Error {
  constructor(message, code = 'UNAUTHORIZED') {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.isCustomError = true
    this.name = this.constructor.name
    this.data = data
    this.code = code
    this.statusCode = 401
  }
}

export class Forbidden extends Error {
  constructor(message, code = 'FORBIDDEN') {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.isCustomError = true
    this.name = this.constructor.name
    this.data = data
    this.code = code
    this.statusCode = 403
  }
}

export class NotFound extends Error {
  constructor(message, code = 'NOT_FOUND') {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.isCustomError = true
    this.name = this.constructor.name
    this.data = data
    this.code = code
    this.statusCode = 404
  }
}

export class MethodNotAllowed extends Error {
  constructor(message, code = 'METHOD_NOT_ALLOWED') {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.isCustomError = true
    this.name = this.constructor.name
    this.data = data
    this.code = code
    this.statusCode = 405
  }
}
