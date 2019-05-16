import { HttpMethod, route } from '@spksoft/koa-decorator'
import mongoose from 'mongoose'
import { BadRequest } from '../../../errors/clientError'

@route('/v1/system')
export default class SystemController {
  @route('/health', HttpMethod.GET)
  async health(ctx) {
    throw new BadRequest('user not found')
    ctx.body = {
      databaseStatus: mongoose.connection.readyState,
    }
  }
}
