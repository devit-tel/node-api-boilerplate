import UserModel from './user.model'
import { MongooseBaseRepository } from '../../libraries/database/repositories/index'

class UserRepository extends MongooseBaseRepository {

}

const instance = new UserRepository(UserModel)
export default instance