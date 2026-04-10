'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card, CardImage, CardContent, CardTitle, CardDescription, CardPrice } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import styles from './page.module.css';

const FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Minimal Desk Lamp',
    slug: 'minimal-desk-lamp',
    price: '$289',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80',
    badge: 'New',
  },
  {
    id: '2',
    name: 'Ceramic Pour-Over Set',
    slug: 'ceramic-pour-over-set',
    price: '$156',
    comparePrice: '$195',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    badge: '20% Off',
  },
  {
    id: '3',
    name: 'Leather Notebook',
    slug: 'leather-notebook',
    price: '$89',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80',
  },
  {
    id: '4',
    name: 'Artisan Candle',
    slug: 'artisan-candle',
    price: '$68',
    image: 'https://images.unsplash.com/photo-1602607714066-4908c9a0a2b5?w=600&q=80',
    badge: 'Bestseller',
  },
];

const CATEGORIES = [
  {
    name: 'Lighting',
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&q=80',
    count: 24,
  },
  {
    name: 'Tableware',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80',
    count: 36,
  },
  {
    name: 'Stationery',
    image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=600&q=80',
    count: 18,
  },
];

export default function HomePage() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newsletterEmail) return;
    // In production, POST to /api/newsletter
    setNewsletterSubmitted(true);
    setNewsletterEmail('');
  }

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Spring Collection 2026</span>
          <h1 className={styles.heroTitle}>
            Curated Luxury for<br />the Modern Home
          </h1>
          <p className={styles.heroDescription}>
            Discover exceptional pieces crafted with precision and purpose.
            Each item in our collection represents the pinnacle of design and functionality.
          </p>
          <div className={styles.heroActions}>
            <Link href="/products">
              <Button size="lg">Explore Collection</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">Our Story</Button>
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroImageWrapper}>
            <Image
              src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&q=80"
              alt="Luxury interior"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.heroImage}
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.heroAccent}></div>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Shop by Category</h2>
            <Link href="/collections" className={styles.sectionLink}>
              View All
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
          <div className={styles.categoryGrid}>
            {CATEGORIES.map((category) => (
              <Link href={`/collections/${category.name.toLowerCase()}`} key={category.name} className={styles.categoryCard}>
                <div className={styles.categoryImageWrapper}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={styles.categoryImage}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.categoryContent}>
                  <h3 className={styles.categoryName}>{category.name}</h3>
                  <span className={styles.categoryCount}>{category.count} Products</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Products</h2>
            <Link href="/products" className={styles.sectionLink}>
              View All
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
          <div className={styles.productGrid}>
            {FEATURED_PRODUCTS.map((product) => (
              <Link href={`/products/${product.slug}`} key={product.id}>
                <Card hover className={styles.productCard}>
                  <CardImage src={product.image} alt={product.name} />
                  <CardContent>
                    {product.badge && (
                      <Badge
                        variant={product.badge === '20% Off' ? 'error' : 'accent'}
                        className={styles.productBadge}
                      >
                        {product.badge}
                      </Badge>
                    )}
                    <CardTitle>{product.name}</CardTitle>
                    <CardPrice
                      amount={product.price}
                      compareAmount={product.comparePrice}
                    />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className={styles.philosophy}>
        <div className={styles.container}>
          <div className={styles.philosophyGrid}>
            <div className={styles.philosophyContent}>
              <span className={styles.sectionTag}>Our Philosophy</span>
              <h2 className={styles.philosophyTitle}>
                Design that transcends the ordinary
              </h2>
              <p className={styles.philosophyText}>
                We believe that the objects we surround ourselves with should inspire and elevate our daily experiences. Every piece in our collection is chosen for its exceptional craftsmanship, timeless design, and sustainable production.
              </p>
              <p className={styles.philosophyText}>
                From the studios of independent artisans to the workshops of established houses, we curate only what meets our exacting standards.
              </p>
              <Link href="/about">
                <Button variant="outline">Learn More</Button>
              </Link>
            </div>
            <div className={styles.philosophyVisual}>
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
                alt="Craftsmanship"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.philosophyImage}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={styles.newsletter}>
        <div className={styles.container}>
          <div className={styles.newsletterContent}>
            <h2 className={styles.newsletterTitle}>Join the Lumina Circle</h2>
            <p className={styles.newsletterText}>
              Be the first to discover new arrivals, exclusive offers, and stories from our artisan partners.
            </p>
            {newsletterSubmitted ? (
              <p className={styles.newsletterSuccess} role="status">
                Thank you for subscribing!
              </p>
            ) : (
              <form className={styles.newsletterForm} onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={styles.newsletterInput}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  aria-label="Email address"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
