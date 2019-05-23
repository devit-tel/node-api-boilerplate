import { HttpMethod, route } from '@spksoft/koa-decorator'
import sample from './domains/sample'

@route('/v1/example')
export default class ExampleController {
  @route('/:hello', HttpMethod.GET)
  sample(ctx) {
    const { hello } = ctx.params
    const { world } = ctx.query
    const { eiei } = ctx.request.headers
    ctx.body = sample(hello, world, eiei)
  }
}
