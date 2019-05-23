import { Repository as ExampleRepository } from '../../models/example'

export default (exampleId, options, overideQuery = {}) =>
  ExampleRepository.findOne({ _id: exampleId, ...overideQuery }, options)
