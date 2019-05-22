import axios from 'axios'
import qs from 'qs'
import R from 'ramda'
import uuid from 'uuid/v4'
import config from '../../../config'
import { jsonTryStringify } from '../../../utils/common'

export const axiosClient = axios.create(config.clients.services.address)

// A wraper that make life abit more easier
export const client = async ({ url = '/', query, ...options }) =>
  R.prop(
    'data',
    await axiosClient({ url: query ? `${url}?${qs.stringify(query)}` : url, ...options }),
  )

export const createGeography = (geography, overideOptions = {}) =>
  client({
    method: 'POST',
    url: '/v1/geographies',
    data: geography,
    ...overideOptions,
  })

export const getGeography = (geographyId, overideOptions = {}) =>
  client({
    method: 'GET',
    url: `/v1/geographies/${geographyId}`,
    ...overideOptions,
  })

export const listGeography = ({ search = '', limit = 10, page = 1 }, overideOptions = {}) =>
  client({
    method: 'GET',
    url: '/v1/geographies',
    query: { search: jsonTryStringify(search), limit, page },
    ...overideOptions,
  })

export const updateGeography = (geographyId, geography, overideOptions = {}) =>
  client({
    method: 'PUT',
    url: `/v1/geographies/${geographyId}`,
    data: geography,
    ...overideOptions,
  })

export const deleteGeography = (geographyId, overideOptions = {}) =>
  client({
    method: 'DELETE',
    url: `/v1/geographies/${geographyId}`,
    ...overideOptions,
  })

export const createGeographyType = (geographyType, overideOptions = {}) =>
  client({
    method: 'POST',
    url: '/v1/geographytypes',
    data: geographyType,
    ...overideOptions,
  })

export const getGeographyType = (geographyTypeId, overideOptions = {}) =>
  client({
    method: 'GET',
    url: `/v1/geographytypes/${geographyTypeId}`,
    ...overideOptions,
  })

export const listGeographyType = ({ search = '', limit = 10, page = 1 }, overideOptions = {}) =>
  client({
    method: 'GET',
    url: '/v1/geographytypes',
    query: {
      search: jsonTryStringify(search),
      limit,
      page,
    },
    ...overideOptions,
  })

export const updateGeographyType = (geographyTypeId, geographyType, overideOptions = {}) =>
  client({
    method: 'PUT',
    url: `/v1/geographytypes/${geographyTypeId}`,
    data: geographyType,
    ...overideOptions,
  })

export const deleteGeographyType = (geographyTypeId, overideOptions = {}) =>
  client({
    method: 'DELETE',
    url: `/v1/geographytypes/${geographyTypeId}`,
    ...overideOptions,
  })

export const getGeoCoding = (address = '', overideOptions = {}) =>
  client({
    method: 'GET',
    url: `/v1/geocoding`,
    query: { address },
    ...overideOptions,
  })

export const getReverseGeoCoding = ({ latitude = 0, longitude = 0 }, overideOptions = {}) =>
  client({
    method: 'GET',
    url: `/v1/reversegeocoding`,
    query: {
      latlng: jsonTryStringify({ latitude, longitude }),
    },
    ...overideOptions,
  })

export const listPlace = (
  { input = '', sessiontoken = uuid(), engines = ['GOOGLE'] },
  overideOptions = {},
) =>
  client({
    method: 'GET',
    url: `/v1/place`,
    query: {
      input,
      sessiontoken,
      engines: jsonTryStringify(engines, undefined),
    },
    ...overideOptions,
  })

export const getPlace = (
  { refId = '', sessiontoken = uuid(), type = 'GOOGLE' },
  overideOptions = {},
) =>
  client({
    method: 'GET',
    url: `/v1/place/${refId}`,
    query: {
      engine: type,
      sessiontoken,
    },
    ...overideOptions,
  })

// locations
// [
//   {
//     latitude: 8.477037,
//     longitude: 99.53094,
//     speed: 81.0,
//     gpsTime: 1545868800000.0,
//     hdop: 0.0,
//   },
//   {
//     latitude: 8.487466,
//     longitude: 99.51978,
//     speed: 81.0,
//     gpsTime: 1545868866000.0,
//     hdop: 0.0,
//   }
// ]
export const getDistanceByDriverLocations = (
  { locations = [], engine = 'HERE' },
  overideOptions = {},
) =>
  client({
    method: 'POST',
    url: `/v1/distance`,
    query: { engine },
    data: locations,
    ...overideOptions,
  })

// wayPoints [{"latitude":13.6859746,"longitude":100.6088129},{"latitude":13.686136,"longitude":100.5409611}]
export const getDirection = ({ wayPoints = [], engine = 'HERE' }, overideOptions = {}) =>
  client({
    method: 'GET',
    url: `/v1/direction`,
    query: { wayPoints: jsonTryStringify(wayPoints), engine },
    ...overideOptions,
  })

export const getHeatmap = (
  { feature, minuend, subtrahend, gridSize, breakPoints, countRadius },
  overideOptions = {},
) =>
  client({
    method: 'POST',
    url: `/v1/heatmap`,
    query: { gridSize, breakPoints, countRadius },
    body: { feature, minuend, subtrahend },
    ...overideOptions,
  })
