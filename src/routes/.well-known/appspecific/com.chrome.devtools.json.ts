import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/.well-known/appspecific/com.chrome.devtools.json')({
  loader: () => new Response('', { status: 204 }),
})
