'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import styles from '../error.module.css';

export default function ProductDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Product detail error:', error);
  }, [error]);

  return (
    <div className={styles.error}>
      <div className={styles.content}>
        <div className={styles.icon}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 className={styles.title}>Product not found</h1>
        <p className={styles.message}>
          This product may have been removed or the link is incorrect.
        </p>
        <Button onClick={() => window.location.href = '/products'}>
          Browse Products
        </Button>
      </div>
    </div>
  );
}
