import { HttpMethod, route } from '@spksoft/koa-decorator'
import mongoose from 'mongoose'
import getHealth from '../../../domains/system/health'

@route('/v1/system')
export default class SystemController {
  @route('/health', HttpMethod.GET)
  health(ctx) {
    ctx.body = getHealth()
  }
}
