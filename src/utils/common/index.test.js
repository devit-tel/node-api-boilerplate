import { jsonTryParse, jsonTryStringify } from './index'

describe('jsonTryParse', () => {
  it('should parse string to javascript object', () => {
    expect(jsonTryParse('{"hello":"world"}')).toEqual({ hello: 'world' })
  })

  it('should return default value if parse not success', () => {
    expect(jsonTryParse('random string', {})).toEqual({})
  })
})

describe('jsonTryStringify', () => {
  it('should Stringify javascript object', () => {
    expect(jsonTryStringify({ hello: 'world' })).toEqual('{"hello":"world"}')
  })

  it('should return default value if parse not success', () => {
    expect(jsonTryStringify('random string', 'default')).toEqual('default')
  })
})
