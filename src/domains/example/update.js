import { Repository as ExampleRepository } from '../../models/example'

export default (exampleId, data, overideQuery = {}) =>
  ExampleRepository.update({ _id: exampleId, overideQuery }, data)
