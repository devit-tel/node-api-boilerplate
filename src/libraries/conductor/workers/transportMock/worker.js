// This is an example file, please remove

import uuid from 'uuid/v4'
import conductorClient from '../..'

conductorClient.registerWatcher(
  'TMS_TRANSPORT_MOCK',
  async (data, updater) => {
    console.log('Im running', 'TMS_TRANSPORT_MOCK', data.taskId)
    let deliveryStatuses = [
      ...data.inputData.statuses,
      {
        status: 'ORDER_DELIVERING',
        updatedAt: Date.now(),
      },
    ]
    await updater.inprogress({
      outputData: {
        statuses: deliveryStatuses,
      },
      callbackAfterSeconds: Number.MAX_SAFE_INTEGER,
    })
    deliveryStatuses = [
      ...deliveryStatuses,
      {
        status: 'PARCEL_DELIVERED',
        parcel: uuid(),
        updatedAt: Date.now(),
      },
    ]
    await updater.inprogress({
      outputData: {
        statuses: deliveryStatuses,
      },
      callbackAfterSeconds: Number.MAX_SAFE_INTEGER,
    })
    deliveryStatuses = [
      ...deliveryStatuses,
      {
        status: 'PARCEL_DELIVERED',
        parcel: uuid(),
        updatedAt: Date.now(),
      },
    ]
    await updater.inprogress({
      outputData: {
        statuses: deliveryStatuses,
      },
      callbackAfterSeconds: Number.MAX_SAFE_INTEGER,
    })
    await updater.complete({
      outputData: {
        statuses: [
          ...deliveryStatuses,
          {
            status: 'ORDER_DELIVERED',
            updatedAt: Date.now(),
          },
        ],
      },
      callbackAfterSeconds: Number.MAX_SAFE_INTEGER,
    })
    console.log('Im Complete', 'TMS_TRANSPORT_MOCK', data.taskId)
  },
  { pollingIntervals: 100, autoAck: true, maxRunner: 100 },
  true,
)
