// Re-export all types
export * from './product';
export * from './cart';
export * from './order';
export * from './user';
export * from './api';
export * from './forms';

// ─── Shared Enums ─────────────────────────────────────────────────────────────

export type Role = 'USER' | 'ADMIN' | 'MERCHANT';

export type CouponType = 'PERCENTAGE' | 'FIXED';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export type AddressType = 'SHIPPING' | 'BILLING';

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popular';

// ─── Utility types ─────────────────────────────────────────────────────────────

export type Decimal = number; // Using number for simplicity; use decimal.js in actual DB operations

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
