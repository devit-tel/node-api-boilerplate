// This is an example file, please remove

import conductorClient from '../..'

conductorClient.registerWatcher(
  'FLEET_FIND_DRIVER_FLOW_MOCK',
  async (data, updater) => {
    console.log('Im running', 'FLEET_FIND_DRIVER_FLOW_MOCK', data.taskId)
    const findDriverStatuses = [
      ...data.inputData.statuses,
      {
        status: 'ORDER_FINDING_DRIVER',
        updatedAt: Date.now(),
      },
    ]
    await updater.inprogress({
      outputData: {
        statuses: findDriverStatuses,
      },
      callbackAfterSeconds: Number.MAX_SAFE_INTEGER,
    })
    await updater.complete({
      outputData: {
        statuses: [
          ...findDriverStatuses,
          {
            status: 'ORDER_FOUND_DRIVER',
            updatedAt: Date.now(),
          },
        ],
      },
      callbackAfterSeconds: Number.MAX_SAFE_INTEGER,
    })
    console.log('Im Complete', 'FLEET_FIND_DRIVER_FLOW_MOCK', data.taskId)
  },
  { maxRunner: 1 },
  true,
)
