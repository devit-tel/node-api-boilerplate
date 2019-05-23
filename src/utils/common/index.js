import R from 'ramda'

export const jsonTryParse = (data, defaultValue = {}) => {
  try {
    return JSON.parse(data)
  } catch (error) {
    return defaultValue
  }
}

export const jsonTryStringify = (data, defaultValue = '{}') => {
  try {
    return R.is(Object, data) ? JSON.stringify(data) : defaultValue
  } catch (error) {
    return defaultValue
  }
}
