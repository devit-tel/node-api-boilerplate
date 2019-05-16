// Make sure import this file at the begining of project

import * as clientError from './clientError'
import * as serverError from './serverError'

global.Errors = {
  ...clientError,
  ...serverError,
}

export default {
  ...clientError,
  ...serverError,
}
