import type { ProductListItem } from './product';
import type { CouponType } from './index';

// ─── Cart Item ────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  quantity: number;
  product: ProductListItem;
  addedAt: Date;
}

export interface CartItemInput {
  productId: string;
  quantity: number;
}

export interface CartItemUpdateInput {
  quantity: number;
}

// ─── Cart ──────────────────────────────────────────────────────────────────────

export interface Cart {
  id: string;
  userId?: string;
  sessionId?: string;
  items: CartItem[];
  subtotal: number;
  itemCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartSummary {
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
}

// ─── Coupon ────────────────────────────────────────────────────────────────────

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  minAmount?: number;
  maxUses?: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
}

export interface CouponValidationResult {
  valid: boolean;
  coupon?: Coupon;
  message?: string;
  discountAmount?: number;
}
