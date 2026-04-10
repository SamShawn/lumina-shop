// ─── Login Form ───────────────────────────────────────────────────────────────

export interface LoginFormInput {
  email: string;
  password: string;
}

export interface RegisterFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// ─── Checkout Form ─────────────────────────────────────────────────────────────

export interface CheckoutFormInput {
  email: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  shippingMethod?: 'standard' | 'express' | 'overnight';
  paymentMethod?: 'card' | 'paypal' | 'applepay';
  saveAddress?: boolean;
  useSameAddress?: boolean;
}

// ─── Contact / Newsletter Form ────────────────────────────────────────────────

export interface NewsletterFormInput {
  email: string;
}

// ─── Review Form ──────────────────────────────────────────────────────────────

export interface ReviewFormInput {
  rating: number;
  title?: string;
  content?: string;
  images?: string[];
}

// ─── Address Form ─────────────────────────────────────────────────────────────

export interface AddressFormInput {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
  type?: 'SHIPPING' | 'BILLING';
}

// ─── Filter / Sort State ──────────────────────────────────────────────────────

export interface ProductsFilterState {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popular';
  search?: string;
}

// ─── UI State ─────────────────────────────────────────────────────────────────

export interface CartDrawerState {
  isOpen: boolean;
}

export interface MobileMenuState {
  isOpen: boolean;
}

export interface LightboxState {
  isOpen: boolean;
  imageIndex: number;
  images: { url: string; alt?: string }[];
}
