// ─── Enums ────────────────────────────────────────────────────────────────────

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

// ─── Address ──────────────────────────────────────────────────────────────────

export interface Address {
  id: string;
  userId: string;
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
  isDefault: boolean;
  type: AddressType;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Order Item ────────────────────────────────────────────────────────────────

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: {
    id: string;
    name: string;
    slug: string;
    images: { url: string; alt?: string }[];
    sku: string;
  };
  quantity: number;
  price: number; // in cents
  total: number;
}

// ─── Order ─────────────────────────────────────────────────────────────────────

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  userId: string;
  user?: { name?: string; email: string };
  items: OrderItem[];
  shippingAddress?: Address;
  billingAddress?: Address;
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod?: string;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  notes?: string;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderListItem {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  total: number;
  itemCount: number;
  createdAt: Date;
}

// ─── Payment ──────────────────────────────────────────────────────────────────

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  method: string;
  status: PaymentStatus;
  provider: string;
  providerId?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}
