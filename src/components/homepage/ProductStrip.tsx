'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/design-system';
import styles from './ProductStrip.module.css';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number; // cents
  images: { url: string; alt?: string }[];
  category?: { name: string };
  isFeatured?: boolean;
}

interface ProductStripProps {
  products: Product[];
  title?: string;
}

export function ProductStrip({ products, title = 'New Arrivals' }: ProductStripProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={ref} aria-label={title}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <Link href="/products" className={styles.viewAll}>
            View All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        <div className={styles.grid}>
          {products.slice(0, 3).map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className={styles.card}
              style={{ animationDelay: visible ? `${index * 100}ms` : '0ms' }}
              aria-hidden={!visible}
            >
              <div className={[styles.imageWrapper, visible ? styles.imageVisible : ''].join(' ')}>
                {product.images[0] && (
                  <Image
                    src={product.images[0].url}
                    alt={product.images[0].alt || product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                )}
                {product.isFeatured && (
                  <Badge variant="warm" className={styles.badge}>
                    Featured
                  </Badge>
                )}
              </div>
              <div className={styles.info}>
                {product.category && (
                  <span className={styles.category}>{product.category.name}</span>
                )}
                <h3 className={styles.productName}>{product.name}</h3>
                <span className={styles.price}>
                  ${(product.price / 100).toFixed(0)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
