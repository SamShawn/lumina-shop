import type { Product, ProductListItem, WishlistItem } from './product';
import type { Cart, CouponValidationResult } from './cart';
import type { Order } from './order';
import type { UserProfile } from './user';

// ─── Generic API Response ─────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  code?: string;
}

// ─── Products ─────────────────────────────────────────────────────────────────

export interface ProductsResponse {
  success: boolean;
  data: {
    products: ProductListItem[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  error?: string;
  message?: string;
}

export interface ProductResponse extends ApiResponse<Product> {}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popular';

export interface ProductsQueryParams {
  page?: number;
  pageSize?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: SortOption;
  search?: string;
  featured?: boolean;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export interface CartResponse extends ApiResponse<Cart> {}

export interface AddToCartInput {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemInput {
  quantity: number;
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export interface CreateOrderInput {
  shippingAddressId?: string;
  billingAddressId?: string;
  paymentMethod?: string;
  notes?: string;
  couponCode?: string;
}

export interface OrderResponse extends ApiResponse<Order> {}

export interface OrdersResponse extends ApiResponse<Order[]> {}

// ─── Coupons ──────────────────────────────────────────────────────────────────

export interface ValidateCouponInput {
  code: string;
  subtotal: number;
}

export interface ValidateCouponResponse extends ApiResponse<CouponValidationResult> {}

// ─── Checkout ─────────────────────────────────────────────────────────────────

export interface CreateCheckoutInput {
  items: { productId: string; quantity: number }[];
  couponCode?: string;
  shippingAddressId?: string;
  billingAddressId?: string;
}

export interface CheckoutSessionResponse extends ApiResponse<{ url: string; sessionId: string }> {}

// ─── User ─────────────────────────────────────────────────────────────────────

export interface UpdateProfileInput {
  name?: string;
  image?: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

// ─── Wishlist ─────────────────────────────────────────────────────────────────

export interface WishlistResponse extends ApiResponse<{ items: WishlistItem[] }> {}

export interface AddToWishlistInput {
  productId: string;
}

// ─── Webhook ──────────────────────────────────────────────────────────────────

export interface StripeWebhookEvent {
  id: string;
  type: string;
  data: {
    object: {
      id: string;
      metadata?: Record<string, string>;
      payment_intent?: string;
      amount_total?: number;
      customer?: string;
      status?: string;
    };
  };
}
