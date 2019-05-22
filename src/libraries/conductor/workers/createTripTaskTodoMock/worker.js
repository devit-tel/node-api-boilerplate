// This is an example file, please remove

import uuid from 'uuid/v4'
import conductorClient from '../..'

conductorClient.registerWatcher(
  'TMS_CREATE_TRIP_TASK_TODO_MOCK',
  async (data, updater) => {
    console.log('Im running', 'TMS_CREATE_TRIP_TASK_TODO_MOCK', data.taskId)
    await updater.complete({
      outputData: {
        tripId: uuid(),
        statuses: [
          {
            status: 'ORDER_CREATED',
            updatedAt: Date.now(),
          },
        ],
      },
      callbackAfterSeconds: Number.MAX_SAFE_INTEGER,
    })
    console.log('Im Complete', 'TMS_CREATE_TRIP_TASK_TODO_MOCK', data.taskId)
  },
  { maxRunner: 20 },
  true,
)
