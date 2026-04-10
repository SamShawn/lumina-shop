// ─── Enums (shared — see src/types/index.ts) ─────────────────────────────────

// ─── Product ──────────────────────────────────────────────────────────────────

export interface ProductImage {
  url: string;
  alt?: string;
  blurDataUrl?: string;
}

export interface ProductSpecifications {
  [key: string]: string | number | boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // stored in cents, formatted at display layer
  comparePrice?: number;
  sku: string;
  stock: number;
  images: ProductImage[];
  video?: string;
  specifications?: ProductSpecifications;
  features: string[];
  categoryId: string;
  category: Category;
  reviews: Review[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductListItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  images: ProductImage[];
  category: Category;
  isFeatured: boolean;
  stock: number;
  rating?: number;
  reviewCount?: number;
}

// ─── Category ─────────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
  productCount?: number;
}

// ─── Review ───────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  userId: string;
  user: { name?: string; image?: string };
  productId: string;
  rating: number;
  title?: string;
  content?: string;
  images: string[];
  isApproved: boolean;
  createdAt: Date;
}

// ─── Wishlist ─────────────────────────────────────────────────────────────────

export interface WishlistItem {
  id: string;
  userId: string;
  product: ProductListItem;
  createdAt: Date;
}
