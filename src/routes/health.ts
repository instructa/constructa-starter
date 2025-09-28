/**
 * Minimal healthcheck endpoint for Dokku.
 * Responds with 200 and a small JSON body.
 */
export async function GET() {
  return new Response(JSON.stringify({ status: 'ok' }), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
    status: 200,
  });
}

// Optional: treat HEAD like GET (fast path for some checkers)
export const HEAD = GET;