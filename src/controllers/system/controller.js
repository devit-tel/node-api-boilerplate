import { HttpMethod, route } from '@sendit-th/koa-decorator'
import getHealth from '../../domains/system/health'
import getMonitor from '../../domains/system/monitor'

@route('/system')
export default class SystemController {
  @route('/health', HttpMethod.GET)
  health() {
    return getHealth()
  }

  @route('/monitor', HttpMethod.GET)
  monitor() {
    return getMonitor()
  }

  @route('/delay', HttpMethod.GET)
  async delay() {
    await new Promise(resolve => setTimeout(() => resolve(), 30000))
    return 'eiei'
  }
}
