import elasticsearch from 'elasticsearch'
import config from '../../config'

export default new elasticsearch.Client({
  ...config.clients.elasticSearch,
  log: 'error',
})
