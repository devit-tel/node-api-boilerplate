// @flow
import VehicleRepository from '../../../../models/vehicle/vehicle.repository'

export default async function createVehicle(vehicle: any) {
  return VehicleRepository.create(vehicle)
}
