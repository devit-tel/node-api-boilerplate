import Mongoose from 'mongoose'
import MongoosePaginate from 'mongoose-paginate'
import timestamps from 'mongoose-timestamp'

const testPlugin = (schema, options) => {
  schema.eachPath((path, schemaType) => {
    console.log('path', path)
    console.log('schemaType', schemaType)
    schemaType.set(function() {
      console.log('HelloWorld')
    })
  })
}

export const schemaDefinition = {
  username: { type: String, required: true, unique: true },
  password: { type: String }
}

var Schema = new Mongoose.Schema(schemaDefinition)
// Schema.pre('save', function(next) {
//   console.log('this', this.password)
//   next()
// })
// Schema.plugin(testPlugin)
Schema.pre('update', function(next) {
  console.log('update this', this)
})
Schema.pre('findOneAndUpdate', function(next) {
  console.log('this', this)
  // throw new Error('aaaaaa')
  next()
})
Schema.plugin(timestamps)
Schema.plugin(MongoosePaginate)

const Model = Mongoose.model('User', Schema)
export default Model
