import { createFileRoute } from '@tanstack/react-router'
import { meili } from '../../../search/meilisearch.ts'

export const Route = createFileRoute('/api/search/')({
  validateSearch: (s) => ({
    q: String(s.q ?? ''),
    limit: Math.max(1, Math.min(100, Number(s.limit ?? 10))),
  }),
  server: {
    handlers: {
      GET: async ({ search }) => {
        const { q, limit } = search as { q: string; limit: number }
        if (!q) {
          return new Response(JSON.stringify({ hits: [], estimatedTotalHits: 0 }), {
            headers: { 'content-type': 'application/json' },
          })
        }
        const res = await meili.index('documents').search(q, { limit })
        return new Response(JSON.stringify(res), {
          headers: { 'content-type': 'application/json' },
        })
      },
    },
  },
})