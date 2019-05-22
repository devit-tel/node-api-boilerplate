import { HttpMethod, route } from '@spksoft/koa-decorator'
import getHealth from '../../domains/system/health'

@route('/system')
export default class SystemController {
  @route('/health', HttpMethod.GET)
  health(ctx) {
    ctx.body = getHealth()
  }
}
