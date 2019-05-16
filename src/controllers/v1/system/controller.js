import { HttpMethod, route } from '@spksoft/koa-decorator'
import mongoose from 'mongoose'
import Errors from '../../../errors'

@route('/v1/system')
export default class SystemController {
  @route('/health', HttpMethod.GET)
  async health(ctx) {
    throw new Errors.BadRequest('user not found')
    ctx.body = {
      databaseStatus: mongoose.connection.readyState,
    }
  }
}
