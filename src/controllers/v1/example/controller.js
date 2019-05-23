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
  async createExample(ctx) {
    ctx.body = await createExample(ctx.request.body)
  }

  @route('/:exampleId', HttpMethod.GET)
  async getExample(ctx) {
    const { exampleId } = ctx.params
    ctx.body = await getExample(exampleId)
  }

  @route('/', HttpMethod.GET)
  async listExample(ctx) {
    const { query, ...options } = ctx.query
    ctx.body = await listExample(jsonTryParse(query), parseMongooseOptions(options))
  }

  @route('/:exampleId', HttpMethod.PUT)
  async updateExample(ctx) {
    const { exampleId } = ctx.params
    ctx.body = await updateExample(exampleId, ctx.request.body)
  }

  @route('/:exampleId', HttpMethod.DELETE)
  async deleteExample(ctx) {
    const { exampleId } = ctx.params
    ctx.body = await deleteExample(exampleId)
  }
}
