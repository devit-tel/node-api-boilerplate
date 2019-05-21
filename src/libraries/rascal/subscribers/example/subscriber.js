// This is an example file, please remove
export const SUBSCRIPTIONS_NAME = 'demo'

export const handler = (message, ackOrNack) => {
  console.log(message)
  ackOrNack()
}
