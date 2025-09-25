import { auth } from '~/server/auth.server';

export type SessionUser = {
  id: string;
  email: string;
  name?: string | null;
};

export async function optionalUser(request: Request): Promise<SessionUser | null> {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) return null;

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
  };
}

export async function requireUser(request: Request): Promise<SessionUser> {
  const user = await optionalUser(request);
  if (!user) {
    throw new Response('Unauthorized', { status: 401 });
  }

  return user;
}
