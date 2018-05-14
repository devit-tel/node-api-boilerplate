import Mongoose from 'mongoose'
import MongoosePaginate from 'mongoose-paginate'
import timestamps from 'mongoose-timestamp'

export const schemaDefinition = {
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    unique: true,
    enum: ['รถบริษัท', 'รถเช่า', 'รถ Suppliers', 'รถ Dynamic Logistics', 'รถ True Leasing', 'รถเช่าซื้อ'],
  },
}

var Schema = new Mongoose.Schema(schemaDefinition)
Schema.plugin(timestamps)
Schema.plugin(MongoosePaginate)

const Model = Mongoose.model('VehicleOwner', Schema)
export default Model
