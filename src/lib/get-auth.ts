import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import type { Session } from 'next-auth';

export async function getAuthSession(): Promise<Session | null> {
  return getServerSession(authOptions);
}

export async function requireAuth(): Promise<Session> {
  const session = await getAuthSession();
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  return session;
}
