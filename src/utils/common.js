export const jsonTryParse = (data, defaultValue = {}) => {
  try {
    return JSON.parse(data)
  } catch (error) {
    return defaultValue
  }
}
