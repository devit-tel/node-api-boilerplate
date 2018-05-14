import Model from './vehicle-owner.model'
import MongooseBaseRepository from '@spksoft/mongoose-repository'

class VehicleOwnerRepository extends MongooseBaseRepository {
    
}

const instance = new VehicleOwnerRepository(Model)
export default instance
