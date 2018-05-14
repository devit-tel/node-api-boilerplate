// @flow
import VehicleRepository from '../../../../models/vehicle/vehicle.repository'

export default async function getVehicles(filter: Object, paginateOptions: Object) {
  return VehicleRepository.find(filter, paginateOptions)
}
