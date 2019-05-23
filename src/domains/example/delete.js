import { Repository as ExampleRepository } from '../../models/example'

export default (exampleId, overideQuery) =>
  ExampleRepository.delete({ _id: exampleId, ...overideQuery })
