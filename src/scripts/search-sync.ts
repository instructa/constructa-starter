import { reindexDocuments } from '../worker/processors/reindexDocuments.ts'

reindexDocuments()
  .then((r) => {
    console.log('[search-sync] complete:', r)
    process.exit(0)
  })
  .catch((e) => {
    console.error('[search-sync] error:', e)
    process.exit(1)
  })