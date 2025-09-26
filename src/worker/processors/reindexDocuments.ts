import { ensureIndexes, indexDocuments } from '../../search/meilisearch.ts'

export async function reindexDocuments() {
  await ensureIndexes()

  // Try to use your repository layer if available
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const repoMod = await import('../../db/repositories/document.repo.ts')
    const getAll = (repoMod as any).getAllDocumentsForSearch || (repoMod as any).getAll || (repoMod as any).listAll
    if (typeof getAll === 'function') {
      const docs = await getAll()
      const normalized = (docs || []).map((d: any) => ({
        id: String(d.id ?? d.documentId ?? d.slug ?? d.uuid),
        title: d.title ?? d.name ?? '',
        content: d.content ?? d.text ?? '',
        fileName: d.fileName ?? d.filename ?? '',
        symbols: d.symbols ?? [],
        headings: d.headings ?? [],
      }))
      await indexDocuments(normalized)
      return { indexed: normalized.length }
    }
  } catch (err) {
    console.warn('[reindex] repository import failed or unexpected shape, skipping', err)
  }

  // Fallback: no-op with hint
  console.warn('[reindex] No repository hook found. Provide getAllDocumentsForSearch() to enable automatic indexing.')
  return { indexed: 0 }
}