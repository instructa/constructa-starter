import '~/lib/observability/sentry.server'

import IORedis from 'ioredis'
import { Worker, Queue, QueueEvents, JobsOptions } from 'bullmq'
import { logger } from '~/lib/logger'
import { runDailyCreditRefill } from './processors/dailyCreditRefill.ts'
import { reindexDocuments } from './processors/reindexDocuments.ts'

const connection = new IORedis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
})

const queueName = process.env.BULLMQ_QUEUE ?? 'system'
const prefix = process.env.BULLMQ_PREFIX ?? 'constructa'
const queue = new Queue(queueName, { connection, prefix })

// Main worker
const worker = new Worker(
  queueName,
  async (job) => {
    switch (job.name) {
      case 'daily-credit-refill':
        logger.info('[worker] running daily-credit-refill')
        return runDailyCreditRefill()
      case 'reindex-all':
        logger.info('[worker] running reindex-all job')
        return reindexDocuments()
      default:
        logger.warn(`[worker] Unknown job "${job.name}" - ignoring`)
    }
  },
  { connection, prefix }
)

worker.on('ready', () => logger.info('[worker] ready'))
worker.on('error', (err) => logger.error('[worker] error', { error: err }))

// Events
const events = new QueueEvents(queueName, { connection, prefix })
events.on('completed', ({ jobId }) => logger.info('[worker] completed job', { jobId }))
events.on('failed', ({ jobId, failedReason }) =>
  logger.error('[worker] job failed', { jobId, error: failedReason })
)

// Bootstrap schedules + optional reindex
;(async () => {
  const cron = process.env.DAILY_CREDIT_REFILL_CRON ?? '0 3 * * *' // 03:00 UTC daily
  const existing = await queue.getRepeatableJobs()
  const has = existing.some((j) => j.name === 'daily-credit-refill' && j.cron === cron)

  if (!has) {
    const opts: JobsOptions = { repeat: { pattern: cron }, jobId: 'daily-credit-refill' }
    await queue.add('daily-credit-refill', {}, opts)
    logger.info('[worker] scheduled daily-credit-refill', { cron })
  }

  if (process.env.SEARCH_REINDEX_ON_BOOT === 'true') {
    await queue.add('reindex-all', {}, { jobId: `reindex-${Date.now()}` })
    logger.info('[worker] queued reindex-all on boot')
  }
})().catch((e) => {
  logger.error('[worker] bootstrap error', { error: e })
})
