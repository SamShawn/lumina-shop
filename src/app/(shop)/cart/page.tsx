'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCartStore } from '@/stores';
import type { CouponValidationResult } from '@/types';
import styles from './page.module.css';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponResult, setCouponResult] = useState<CouponValidationResult | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 10000 ? 0 : 995;
  const discount = couponResult?.valid ? (couponResult.discountAmount ?? 0) : 0;
  const total = subtotal + shipping - discount;

  async function handleApplyCoupon() {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    try {
      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, subtotal }),
      });
      const data = await res.json();
      setCouponResult(data);
    } catch {
      setCouponResult({ valid: false, message: 'Failed to validate coupon' });
    } finally {
      setCouponLoading(false);
    }
  }

  function handleCheckout() {
    if (items.length === 0) return;
    router.push('/checkout');
  }

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.title}>Shopping Cart</h1>
          <div className={styles.empty}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
              <path d="M3 6h18"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items yet.</p>
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Shopping Cart</h1>

        <div className={styles.layout}>
          {/* Cart Items */}
          <div className={styles.items}>
            <div className={styles.itemsHeader} aria-hidden>
              <span>Product</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>
            <div className={styles.itemsList} role="list">
              {items.map((item) => (
                <div key={item.id} className={styles.item} role="listitem">
                  <div className={styles.itemProduct}>
                    <Link href={`/products/${item.product.slug}`} className={styles.itemImageLink}>
                      <div className={styles.itemImage}>
                        <Image
                          src={item.product.images[0]?.url ?? ''}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </Link>
                    <div className={styles.itemInfo}>
                      <Link href={`/products/${item.product.slug}`} className={styles.itemName}>
                        {item.product.name}
                      </Link>
                      <div className={styles.itemPrice}>
                        <span className={styles.itemCurrentPrice}>
                          ${(item.product.price / 100).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.itemQuantity} role="group" aria-label={`Quantity for ${item.product.name}`}>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
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
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path d="M12 5v14M5 12h14"/>
                      </svg>
                    </button>
                  </div>
                  <div className={styles.itemTotal} aria-label="Item total">
                    ${((item.product.price * item.quantity) / 100).toFixed(2)}
                  </div>
                  <button
                    className={styles.itemRemove}
                    onClick={() => removeItem(item.product.id)}
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                      <path d="M18 6 6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className={styles.itemsFooter}>
              <Button variant="ghost" onClick={clearCart}>Clear Cart</Button>
              <Link href="/products">
                <Button variant="ghost">Continue Shopping</Button>
              </Link>
            </div>
          </div>

          {/* Summary */}
          <aside className={styles.summary} aria-label="Order summary">
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${(subtotal / 100).toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${(shipping / 100).toFixed(2)}`}</span>
              </div>
              {shipping > 0 && (
                <p className={styles.freeShippingNote}>
                  Add ${((10000 - subtotal) / 100).toFixed(2)} more for free shipping
                </p>
              )}
              {discount > 0 && (
                <div className={styles.summaryRow} style={{ color: 'var(--color-success)' }}>
                  <span>Discount</span>
                  <span>-${(discount / 100).toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className={styles.coupon}>
              <Input
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value);
                  setCouponResult(null);
                }}
                aria-label="Coupon code"
              />
              <Button
                variant="outline"
                onClick={handleApplyCoupon}
                disabled={!couponCode.trim() || couponLoading}
                isLoading={couponLoading}
              >
                Apply
              </Button>
            </div>
            {couponResult && (
              <p
                className={couponResult.valid ? styles.couponSuccess : styles.couponError}
                role="status"
                aria-live="polite"
              >
                {couponResult.valid ? `✓ ${couponResult.message}` : `✕ ${couponResult.message}`}
              </p>
            )}

            <div className={styles.summaryDivider} aria-hidden />

            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span className={styles.totalAmount}>${(total / 100).toFixed(2)}</span>
            </div>

            <Button
              size="lg"
              className={styles.checkoutBtn}
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>

            <div className={styles.secureNote}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>Secure checkout with 256-bit SSL encryption</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
