// This is an example file, please remove
export const SUBSCRIPTIONS_NAME = 'demo'

export const handler = (message, respond) => {
  console.log(message)
  // respond.nack(new Error('Nope'))
  respond.ack()
}
