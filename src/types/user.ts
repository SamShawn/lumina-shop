import type { Role } from './index';
import type { OrderListItem } from './order';
import type { Address } from './order';
import type { WishlistItem } from './product';

// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  addresses: Address[];
  orders: OrderListItem[];
  wishlist: WishlistItem[];
}

// ─── Session / Auth ───────────────────────────────────────────────────────────

export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
}

// ─── Account (OAuth) ──────────────────────────────────────────────────────────

export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}

// ─── Auth utilities ───────────────────────────────────────────────────────────

/**
 * Get the session user with full type safety.
 * Use this instead of accessing session.user directly when you need Role info.
 */
export function getSessionUser(session: { user?: { id: string; name?: string | null; email?: string | null; image?: string | null; role: Role } } | null) {
  return session?.user ?? null;
}

/**
 * Type guard to check if user has admin role
 */
export function isAdmin(user: { role: Role } | null): boolean {
  return user?.role === 'ADMIN';
}

/**
 * Type guard to check if user has merchant role
 */
export function isMerchant(user: { role: Role } | null): boolean {
  return user?.role === 'MERCHANT';
}
