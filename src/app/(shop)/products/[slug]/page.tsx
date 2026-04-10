'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/stores';
import styles from './page.module.css';

// Mock product for demo — in production this would be fetched from /api/products/[slug]
const PRODUCT = {
  id: '1',
  name: 'Minimal Desk Lamp',
  slug: 'minimal-desk-lamp',
  description: 'A precision-crafted desk lamp that combines form and function in perfect balance. The minimalist silhouette houses advanced LED technology with adjustable color temperature, providing ideal illumination for any task. Constructed from aerospace-grade aluminum with a weighted base for stability.',
  price: 28900, // cents
  comparePrice: undefined,
  sku: 'LDL-001',
  stock: 23,
  images: [
    { url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80' },
    { url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80' },
    { url: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&q=80' },
  ],
  features: [
    'Adjustable color temperature (2700K-6500K)',
    'Touch-sensitive dimming control',
    'USB-C fast charging port',
    '40,000 hour LED lifespan',
    'Weighted aluminum base',
  ],
  specifications: {
    'Material': 'Aluminum, Steel',
    'Dimensions': '18" H x 5" W x 5" D',
    'Weight': '2.5 lbs',
    'Power': '12W LED',
    'Lumens': '800',
  },
  category: { id: '1', name: 'Lighting', slug: 'lighting' },
  reviews: [],
  isActive: true,
  isFeatured: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function ProductDetailPage() {
  const router = useRouter();
  const { addItem, openCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const rating = 4.8;
  const reviewCount = 47;

  function increment() {
    if (quantity < PRODUCT.stock) setQuantity((q) => q + 1);
  }

  function decrement() {
    if (quantity > 1) setQuantity((q) => q - 1);
  }

  function handleAddToCart() {
    addItem(
      {
        id: PRODUCT.id,
        name: PRODUCT.name,
        slug: PRODUCT.slug,
        price: PRODUCT.price,
        comparePrice: PRODUCT.comparePrice,
        images: PRODUCT.images,
        category: PRODUCT.category,
        isFeatured: PRODUCT.isFeatured,
        stock: PRODUCT.stock,
      },
      quantity
    );
    setAddedToCart(true);
    openCart();
    setTimeout(() => setAddedToCart(false), 2000);
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

        <div className={styles.layout}>
          {/* Gallery */}
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <Image
                src={PRODUCT.images[selectedImage].url}
                alt={PRODUCT.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            <div className={styles.thumbnails} role="list">
              {PRODUCT.images.map((img, index) => (
                <button
                  key={index}
                  role="listitem"
                  className={`${styles.thumbnail} ${index === selectedImage ? styles.active : ''}`}
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View image ${index + 1}`}
                  aria-pressed={index === selectedImage}
                >
                  <Image
                    src={img.url}
                    alt={`${PRODUCT.name} view ${index + 1}`}
                    fill
                    sizes="80px"
                    style={{ objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className={styles.info}>
            <Badge variant="accent">New Arrival</Badge>
            <h1 className={styles.title}>{PRODUCT.name}</h1>

            <div className={styles.rating} aria-label={`Rating: ${rating} out of 5`}>
              <div className={styles.stars} aria-hidden>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill={star <= Math.floor(rating) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <span className={styles.ratingText}>{rating} ({reviewCount} reviews)</span>
            </div>

            <div className={styles.price}>
              <span className={styles.currentPrice}>${(PRODUCT.price / 100).toFixed(2)}</span>
              {PRODUCT.comparePrice && (
                <span className={styles.comparePrice}>${(PRODUCT.comparePrice / 100).toFixed(2)}</span>
              )}
            </div>

            <p className={styles.description}>{PRODUCT.description}</p>

            {/* Features */}
            <div className={styles.features}>
              <h3 className={styles.sectionTitle}>Features</h3>
              <ul className={styles.featureList}>
                {PRODUCT.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity */}
            <div className={styles.quantity}>
              <span className={styles.quantityLabel}>Quantity</span>
              <div className={styles.quantityControl} role="group" aria-label="Quantity selector">
                <button
                  className={styles.quantityBtn}
                  onClick={decrement}
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M5 12h14"/>
                  </svg>
                </button>
                <span className={styles.quantityValue} aria-live="polite" aria-atomic="true">{quantity}</span>
                <button
                  className={styles.quantityBtn}
                  onClick={increment}
                  aria-label="Increase quantity"
                  disabled={quantity >= PRODUCT.stock}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </button>
              </div>
              {PRODUCT.stock <= 5 && (
                <span className={styles.lowStock}>Only {PRODUCT.stock} left in stock</span>
              )}
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              <Button
                size="lg"
                className={styles.addToCart}
                onClick={handleAddToCart}
                isLoading={false}
              >
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </Button>
              <Button variant="outline" size="lg" aria-label="Add to wishlist">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </Button>
            </div>

            {/* Specifications */}
            <div className={styles.specifications}>
              <h3 className={styles.sectionTitle}>Specifications</h3>
              <dl className={styles.specList}>
                {Object.entries(PRODUCT.specifications ?? {}).map(([key, value]) => (
                  <div key={key} className={styles.specItem}>
                    <dt>{key}</dt>
                    <dd>{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
