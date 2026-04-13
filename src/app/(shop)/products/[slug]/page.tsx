'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProductGallery } from '@/components/pdp/ProductGallery';
import { ProductInfo } from '@/components/pdp/ProductInfo';
import { useCartStore } from '@/stores';
import styles from './page.module.css';

// In production this comes from /api/products/[slug]. Using mock data.
const PRODUCT = {
  id: '1',
  name: 'Hand-Thrown Ceremonial Bowl',
  slug: 'hand-thrown-ceremonial-bowl',
  price: 28500,
  description:
    'Wheel-thrown from local stoneware clay. Each piece develops its own character through the wood-firing process — no two are identical.',
  stock: 12,
  category: { id: 'cat-1', name: 'Ceramics', slug: 'ceramics' },
  images: [
    { url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80', alt: 'Ceremonial bowl front view' },
    { url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80', alt: 'Ceremonial bowl detail' },
    { url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80', alt: 'Ceremonial bowl in use' },
  ],
  maker: { name: 'Elena Vasić', location: 'Zagreb, Croatia' },
  options: [
    { name: 'Glaze', values: ['Ash White', 'Iron Brown', 'Sand'] },
  ],
};

export default function ProductDetailPage() {
  const { addItem, openCart } = useCartStore();

  function handleAddToCart() {
    addItem({
      id: PRODUCT.id,
      name: PRODUCT.name,
      slug: PRODUCT.slug,
      price: PRODUCT.price,
      images: PRODUCT.images,
      category: PRODUCT.category,
      isFeatured: true,
      stock: PRODUCT.stock,
    });
    openCart();
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/products">Products</Link>
          <span aria-hidden>/</span>
          <span aria-current="page">{PRODUCT.name}</span>
        </nav>

        {/* Split view layout */}
        <div className={styles.split}>
          {/* Left: sticky gallery */}
          <motion.div
            className={styles.gallery}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProductGallery images={PRODUCT.images} productName={PRODUCT.name} />
          </motion.div>

          {/* Right: scrollable info */}
          <ProductInfo product={PRODUCT} onAddToCart={handleAddToCart} />
        </div>
      </div>
    </div>
  );
}
