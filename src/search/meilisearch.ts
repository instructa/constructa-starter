import { MeiliSearch } from 'meilisearch'

const host = process.env.MEILI_HOST ?? 'http://localhost:7700'
const apiKey = process.env.MEILI_API_KEY ?? process.env.MEILI_MASTER_KEY

export const meili = new MeiliSearch({
  host,
  apiKey,
})

export type SearchDoc = {
  id: string
  title?: string
  content?: string
  fileName?: string
  symbols?: string[]
  headings?: string[]
}

export async function ensureIndexes() {
  try {
    await meili.createIndex('documents', { primaryKey: 'id' })
  } catch {
    // index likely exists
  }
}

export async function indexDocuments(docs: SearchDoc[]) {
  const index = meili.index<SearchDoc>('documents')
  await index.addDocuments(docs)
}