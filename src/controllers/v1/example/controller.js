import { HttpMethod, route } from '@spksoft/koa-decorator'
import createExample from '../../../domains/example/create'
import getExample from '../../../domains/example/get'
import listExample from '../../../domains/example/list'
import updateExample from '../../../domains/example/update'
import deleteExample from '../../../domains/example/delete'
import { parseMongooseOptions } from '../../../utils/request'
import { jsonTryParse } from '../../../utils/common'

@route('/v1/example')
export default class ExampleController {
  @route('/', HttpMethod.POST)
  createExample(ctx) {
    return createExample(ctx.request.body)
  }

  @route('/:exampleId', HttpMethod.GET)
  getExample(ctx) {
    const { exampleId } = ctx.params
    return getExample(exampleId)
  }

  @route('/', HttpMethod.GET)
  listExample(ctx) {
    const { query, ...options } = ctx.query
    return listExample(jsonTryParse(query), parseMongooseOptions(options))
  }

  @route('/:exampleId', HttpMethod.PUT)
  updateExample(ctx) {
    const { exampleId } = ctx.params
    ctx.body = updateExample(exampleId, ctx.request.body)
  }

  @route('/:exampleId', HttpMethod.DELETE)
  deleteExample(ctx) {
    const { exampleId } = ctx.params
    ctx.body = deleteExample(exampleId)
  }
}
