'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/stores';
import { Button } from '@/components/design-system';
import styles from './CartDrawer.module.css';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem } = useCartStore();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) closeCart();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Shopping cart"
            role="dialog"
            aria-modal="true"
          >
            {/* Left panel: items */}
            <div className={styles.itemsPanel}>
              <div className={styles.panelHeader}>
                <h2 className={styles.title}>Your Cart</h2>
                <span className={styles.itemCount}>{itemCount} items</span>
              </div>

              {items.length === 0 ? (
                <div className={styles.empty}>
                  <p className={styles.emptyText}>Your cart is empty</p>
                  <Button variant="outline" size="md" onClick={closeCart}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className={styles.items} role="list">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        className={styles.item}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, height: 0, overflow: 'hidden', marginBottom: 0 }}
                        transition={{ duration: 0.2 }}
                        role="listitem"
                      >
                        <Link
                          href={`/products/${item.product.slug}`}
                          className={styles.itemImage}
                          onClick={closeCart}
                          tabIndex={isOpen ? 0 : -1}
                        >
                          <Image
                            src={item.product.images[0]?.url ?? ''}
                            alt={item.product.name}
                            fill
                            sizes="60px"
                            style={{ objectFit: 'cover' }}
                          />
                        </Link>
                        <div className={styles.itemInfo}>
                          <Link
                            href={`/products/${item.product.slug}`}
                            className={styles.itemName}
                            onClick={closeCart}
                            tabIndex={isOpen ? 0 : -1}
                          >
                            {item.product.name}
                          </Link>
                          <span className={styles.itemPrice}>
                            ${(item.product.price / 100).toFixed(2)}
                          </span>
                          <div className={styles.itemActions}>
                            <div className={styles.qtyControl} role="group" aria-label="Quantity">
                              <button
                                className={styles.qtyBtn}
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                aria-label="Decrease quantity"
                                tabIndex={isOpen ? 0 : -1}
                              >
                                −
                              </button>
                              <span className={styles.qtyValue}>{item.quantity}</span>
                              <button
                                className={styles.qtyBtn}
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                aria-label="Increase quantity"
                                tabIndex={isOpen ? 0 : -1}
                              >
                                +
                              </button>
                            </div>
                            <button
                              className={styles.removeBtn}
                              onClick={() => removeItem(item.product.id)}
                              aria-label={`Remove ${item.product.name}`}
                              tabIndex={isOpen ? 0 : -1}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className={styles.divider} aria-hidden="true" />

            {/* Right panel: summary + checkout */}
            <div className={styles.summaryPanel}>
              <div className={styles.summaryRows}>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>${(subtotal / 100).toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <span className={styles.muted}>Calculated at checkout</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Taxes</span>
                  <span className={styles.muted}>Calculated at checkout</span>
                </div>
              </div>

              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalAmount}>${(subtotal / 100).toFixed(2)}</span>
              </div>

              <Button
                size="lg"
                className={styles.checkoutBtn}
                onClick={() => { closeCart(); window.location.href = '/checkout'; }}
              >
                Proceed to Checkout
              </Button>

              <div className={styles.trustNote}>
                🔒 Secure checkout · SSL encrypted
              </div>

              <div className={styles.trustIcons}>
                <span>Free Returns</span>
                <span>Sustainably Packaged</span>
                <span>Maker Direct</span>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}