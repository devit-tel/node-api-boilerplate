// @flow
import { HttpMethod, route } from '@spksoft/koa-decorator'
import { Context } from 'koa'

import createVehicle from './domains/creating-vehicle.flow'
import updateVehicle from './domains/updating-vehicle.flow'
import listVehicles from './domains/getting-vehicle-list.access'

@route('/v1/vehicles')
export default class HelloWorldController {
  @route('/', HttpMethod.POST)
  async create(ctx: Context) {
    const { body } = ctx.request
    ctx.body = await createVehicle(body)
  }

  @route('/:vehicleId', HttpMethod.PUT)
  async update(ctx: Context) {
    const { vehicleId } = ctx.params
    const { body } = ctx.request
    ctx.body = await updateVehicle(vehicleId, body)
  }

  @route('/', HttpMethod.GET)
  async list(ctx: Context) {
    const { limit, page, sort } = ctx.query
    ctx.body = await listVehicles({}, {limit, page, sort})
  }
}
