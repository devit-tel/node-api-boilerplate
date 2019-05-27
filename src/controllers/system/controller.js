import { HttpMethod, route } from '@sendit-th/koa-decorator'
import getHealth from '../../domains/system/health'

@route('/system')
export default class SystemController {
  @route('/health', HttpMethod.GET)
  health() {
    return getHealth()
  }
}
