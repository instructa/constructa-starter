export function assertPro(user: { plan?: string }) {
  if (user.plan !== 'pro') {
    throw new Response('Upgrade required', { status: 402 });
  }
}