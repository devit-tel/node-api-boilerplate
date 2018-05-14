import Model from './vehicle.model'
import MongooseBaseRepository from '@spksoft/mongoose-repository'

class VehicleRepository extends MongooseBaseRepository {}

const instance = new VehicleRepository(Model)
export default instance
