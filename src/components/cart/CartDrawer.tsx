'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores';
import { Button } from '@/components/ui/Button';
import styles from './CartDrawer.module.css';

export function CartDrawer() {
  const router = useRouter();
  const { items, isOpen, closeCart, updateQuantity, removeItem } = useCartStore();

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 10000;
  const hasFreeShipping = subtotal >= freeShippingThreshold;
  const amountToFreeShipping = freeShippingThreshold - subtotal;

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) closeCart();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  function handleCheckout() {
    closeCart();
    router.push('/checkout');
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.open : ''}`}
        aria-hidden={!isOpen}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={`${styles.drawer} ${isOpen ? styles.open : ''}`}
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Cart
            <span className={styles.itemCount}>({items.reduce((s, i) => s + i.quantity, 0)})</span>
          </h2>
          <button
            className={styles.closeBtn}
            onClick={closeCart}
            aria-label="Close cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Items or Empty */}
        {items.length === 0 ? (
          <div className={styles.empty}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
              <path d="M3 6h18"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <h3>Your cart is empty</h3>
            <p>Add something beautiful to get started.</p>
            <Button onClick={closeCart} variant="outline">Continue Shopping</Button>
          </div>
        ) : (
          <>
            {/* Item List */}
            <div className={styles.items} role="list" aria-label="Cart items">
              {items.map((item) => (
                <div key={item.id} className={styles.item} role="listitem">
                  <Link
                    href={`/products/${item.product.slug}`}
                    className={styles.itemImage}
                    onClick={closeCart}
                    tabIndex={isOpen ? 0 : -1}
                    aria-label={item.product.name}
                  >
                    <Image
                      src={item.product.images[0]?.url ?? ''}
                      alt={item.product.name}
                      fill
                      sizes="72px"
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
                      <div className={styles.quantityControl} role="group" aria-label={`Quantity for ${item.product.name}`}>
                        <button
                          className={styles.quantityBtn}
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          tabIndex={isOpen ? 0 : -1}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                            <path d="M5 12h14"/>
                          </svg>
                        </button>
                        <span className={styles.quantityValue} aria-live="polite" aria-atomic="true">
                          {item.quantity}
                        </span>
                        <button
                          className={styles.quantityBtn}
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          tabIndex={isOpen ? 0 : -1}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                            <path d="M12 5v14M5 12h14"/>
                          </svg>
                        </button>
                      </div>
                      <button
                        className={styles.itemRemove}
                        onClick={() => removeItem(item.product.id)}
                        aria-label={`Remove ${item.product.name}`}
                        tabIndex={isOpen ? 0 : -1}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                          <path d="M18 6 6 18M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className={styles.footer}>
              {!hasFreeShipping && amountToFreeShipping > 0 && (
                <p className={styles.freeShippingNote}>
                  Add ${((amountToFreeShipping) / 100).toFixed(2)} more for free shipping
                </p>
              )}
              <div className={styles.subtotalRow}>
                <span className={styles.subtotalLabel}>Subtotal</span>
                <span className={styles.subtotalAmount}>${(subtotal / 100).toFixed(2)}</span>
              </div>
              <div className={styles.actions}>
                <Button size="lg" onClick={handleCheckout}>
                  Checkout
                </Button>
                <Link href="/cart" className={styles.viewCartLink} onClick={closeCart}>
                  <Button size="lg" variant="outline" style={{ width: '100%' }}>
                    View Cart
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
