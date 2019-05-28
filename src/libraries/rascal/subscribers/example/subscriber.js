// This is an example file, please remove
export const SUBSCRIPTIONS_NAME = 'demo'

export const handler = async (message, respond) => {
  console.log(message)
  await new Promise(resolve => setTimeout(() => resolve(), 5000))
  // respond.nack(new Error('Nope'))
  respond.ack()
}
