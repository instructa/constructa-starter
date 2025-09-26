export async function runDailyCreditRefill() {
  const url = process.env.JOB_DAILY_CREDIT_REFILL_URL
  if (!url) throw new Error('JOB_DAILY_CREDIT_REFILL_URL is not set')

  const headers: Record<string, string> = {}
  if (process.env.JOBS_SECRET) headers['x-jobs-secret'] = process.env.JOBS_SECRET

  // Try POST first, fall back to GET if route uses GET
  const tryPost = await fetch(url, { method: 'POST', headers }).catch(() => undefined)
  if (tryPost && tryPost.ok) return await tryPost.text()

  const res = await fetch(url, { method: 'GET', headers })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`daily-credit-refill failed: ${res.status} ${body}`)
  }
  return await res.text()
}