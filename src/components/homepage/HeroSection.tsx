'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './HeroSection.module.css';

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Trigger entrance animation on mount
    const timer = setTimeout(() => {
      containerRef.current?.classList.add(styles.loaded);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.hero} ref={containerRef} aria-label="Hero">
      {/* Ambient gradient background */}
      <div className={styles.gradient} aria-hidden="true" />

      {/* Content */}
      <div className={styles.content}>
        <span className={styles.tag}>Handcrafted Objects · Spring Collection</span>

        <h1 className={styles.title}>
          Crafted with <em>Intention</em>
        </h1>

        <p className={styles.subtitle}>
          Small-batch goods made by hand, built to last
        </p>

        <div className={styles.actions}>
          <Link href="/products" className={styles.ctaLink}>
            Explore the Collection
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}