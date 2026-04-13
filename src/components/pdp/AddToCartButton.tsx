'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/design-system';
import styles from './AddToCartButton.module.css';

interface AddToCartButtonProps {
  onClick: () => void;
  stock?: number;
}

export function AddToCartButton({ onClick, stock }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const isOutOfStock = stock === 0;

  function handleClick() {
    if (isOutOfStock) return;
    onClick();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className={styles.wrapper}>
      <Button
        size="lg"
        className={styles.button}
        onClick={handleClick}
        disabled={isOutOfStock}
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          {added ? (
            <motion.span
              key="added"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className={styles.addedText}
            >
              ✓ Added to Cart
            </motion.span>
          ) : isOutOfStock ? (
            <motion.span key="notify" className={styles.addedText}>
              Notify Me When Available
            </motion.span>
          ) : (
            <motion.span key="add" className={styles.addText}>
              Add to Cart
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
      {!isOutOfStock && stock !== undefined && stock <= 5 && (
        <span className={styles.lowStock}>Only {stock} left in stock</span>
      )}
    </div>
  );
}
