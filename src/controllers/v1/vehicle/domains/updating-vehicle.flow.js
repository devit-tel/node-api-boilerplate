// @flow
import VehicleRepository from '../../../../models/vehicle/vehicle.repository'

export default async function createVehicle(vehicleId: string, vehicle: any) {
  return VehicleRepository.update({ vehicleId }, vehicle)
}
