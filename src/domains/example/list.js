import { Repository as ExampleRepository } from '../../models/example'

export default (query, options) => ExampleRepository.find({ query }, options)
