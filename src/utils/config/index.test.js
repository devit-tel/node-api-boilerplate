import { replaceVariable, splitVariable, enrichRascalCofig } from './index'

describe('replaceVariable', () => {
  it('should replace variable that match with', () => {
    expect(replaceVariable('Hello, my name is ${NAME}', /\${NAME}/is, 'Kala')).toMatch(
      'Hello, my name is Kala',
    )
  })
})

describe('splitVariable', () => {
  it('should split variable into an array', () => {
    expect(splitVariable('EIEI,HUHU,HAHA', ',')).toEqual(['EIEI', 'HUHU', 'HAHA'])
  })
})

describe('enrichRascalCofig', () => {
  it('should split variable into an array', () => {
    expect(
      enrichRascalCofig({
        subscriptions: {
          demo: {},
          anotherDemo: {},
        },
        publications: {
          'node-api-boilerplate.demo': {
            exchange: 'node-api-boilerplate',
            routingKey: 'demo',
          },
        },
      }),
    ).toEqual({
      subscriptions: {
        demo: { queue: 'node-api-boilerplate.demo' },
        anotherDemo: { queue: 'node-api-boilerplate.anotherDemo' },
      },
      publications: {
        'node-api-boilerplate.demo': { exchange: 'node-api-boilerplate', routingKey: 'demo' },
        'node-api-boilerplate.demo.error': {
          queue: 'node-api-boilerplate.demo.error',
          autoCreated: true,
        },
        'node-api-boilerplate.anotherDemo.error': {
          queue: 'node-api-boilerplate.anotherDemo.error',
          autoCreated: true,
        },
      },
      queues: {
        'node-api-boilerplate.demo': { assert: true, options: { durable: true } },
        'node-api-boilerplate.demo.error': { assert: true, options: { durable: true } },
        'node-api-boilerplate.anotherDemo': { assert: true, options: { durable: true } },
        'node-api-boilerplate.anotherDemo.error': { assert: true, options: { durable: true } },
      },
      exchanges: { 'node-api-boilerplate': { assert: true, options: { durable: true } } },
      bindings: {
        'node-api-boilerplate.demo': {
          source: 'node-api-boilerplate',
          destination: 'node-api-boilerplate.demo',
          destinationType: 'queue',
          bindingKey: 'demo',
        },
        'node-api-boilerplate.anotherDemo': {
          source: 'node-api-boilerplate',
          destination: 'node-api-boilerplate.anotherDemo',
          destinationType: 'queue',
          bindingKey: 'anotherDemo',
        },
      },
    })
  })
})
