// This is an example file, please remove

import conductorClient from '../..'

conductorClient.registerWatcher(
  'TMS_SUMMARY_MOCK',
  async (data, updater) => {
    console.log('Im running', 'TMS_SUMMARY_MOCK', data.taskId)
    await updater.complete({
      outputData: {
        statuses: [
          ...data.inputData.statuses,
          {
            status: 'ORDER_COMPLETED',
            updatedAt: Date.now(),
          },
        ],
      },
      callbackAfterSeconds: Number.MAX_SAFE_INTEGER,
    })
    console.log('Im Complete', 'TMS_SUMMARY_MOCK', data.taskId)
  },
  { pollingIntervals: 100, autoAck: true, maxRunner: 100 },
  true,
)
