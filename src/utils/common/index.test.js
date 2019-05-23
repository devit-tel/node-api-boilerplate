import { jsonTryParse, jsonTryStringify } from './index'

describe('jsonTryParse', () => {
  it('should parse string to javascript object', () => {
    expect(jsonTryParse('{ "hello": "world" }')).toEqual({ hello: 'world' })
  })

  it('should return default value if parse not success', () => {
    expect(jsonTryParse('{ "hello": "world" bar}', {})).toEqual({})
  })
})
