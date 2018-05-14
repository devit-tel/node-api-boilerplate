import Mongoose from 'mongoose'
import MongoosePaginate from 'mongoose-paginate'
import timestamps from 'mongoose-timestamp'
import shortid from 'shortid'

export const Schema = new Mongoose.Schema({
  vehicleId: {
    type: String,
    default: () => `vehicle_${shortid.generate()}`,
  },
  owner: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'VehicleOwner',
  },
  licensePlate: {
    type: String,
    require: true,
  },
  provinceName: {
    type: String,
    require: true,
  },
  model: {
    type: String,
    required: true,
  },
  gpsId: {
    type: String,
  },
  energyType: {
    type: String,
    enum: ['Diesel', 'Gas', 'Gasoline', 'Electricity'],
    require: true,
  },
  brand: {
    type: String,
    require: true,
  },
  color: {
    type: [String],
    require: true,
  },

  weight: {
    total: {
      type: Number,
      require: true,
    },
    load: {
      type: Number,
      require: true,
    },
    unit: {
      type: String,
      require: true,
      default: 'KG',
    },
  },
  dimension: {
    width: {
      type: Number,
      require: true,
    },
    depth: {
      type: Number,
      require: true,
    },
    height: {
      type: Number,
      require: true,
    },
    unit: {
      type: String,
      require: true,
      default: 'CM',
    },
  },
  allowShare: {
    type: Boolean,
  },
  remark: {
    type: String,
  },
})

Schema.plugin(timestamps)
Schema.plugin(MongoosePaginate)

const Model = Mongoose.model('Vehicle', Schema)
export default Model
