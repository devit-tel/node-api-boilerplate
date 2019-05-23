import repositoryBuilder from 'sendit-mongoose-repository'

export const schemaDefinition = {
  name: String,
  code: String,
  customerId: {
    type: String,
    unique: true,
  },
  note: String,
  joinedAt: {
    type: Date,
    default: new Date(),
  },
  metadata: {
    level: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: ['SNAKE', 'SNAKE_FISH', 'FISH'],
      required() {
        return this.metadata.level > 0
      },
    },
  },
}

export const { Repository, Schema, Model } = repositoryBuilder('Sample', schemaDefinition, {
  indexs: [
    {
      fields: { code: 1, customerId: 1 },
      options: { unique: true },
    },
  ],
})

export default Repository
