import { parseMongooseOptions } from './index'

describe('parseMongooseOptions', () => {
  it('should parse mongoose option from queryString', () => {
    expect(parseMongooseOptions({ limit: '10', page: '20', populate: 'eiei' })).toEqual({
      limit: 10,
      page: 20,
      populate: 'eiei',
    })
  })
})
