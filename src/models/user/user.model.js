import Mongoose from 'mongoose'
import MongoosePaginate from 'mongoose-paginate'
import timestamps from 'mongoose-timestamp'

export const schemaDefinition = {
  username: { type: String, required: true, unique: true },
  password: { type: String },
}

var Schema = new Mongoose.Schema(schemaDefinition)
Schema.plugin(timestamps)
Schema.plugin(MongoosePaginate)

Mongoose.model('User', Schema)
