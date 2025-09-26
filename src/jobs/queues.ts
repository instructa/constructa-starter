import IORedis from 'ioredis'
import { Queue } from 'bullmq'

const connection = new IORedis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
})

export const queueName = process.env.BULLMQ_QUEUE ?? 'system'
export const queuePrefix = process.env.BULLMQ_PREFIX ?? 'constructa'

export const systemQueue = new Queue(queueName, {
  connection,
  prefix: queuePrefix,
})

export default systemQueue