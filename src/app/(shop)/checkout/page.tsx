'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import styles from './page.module.css';

const CART_ITEMS = [
  { id: '1', name: 'Minimal Desk Lamp', price: 289, quantity: 1, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&q=80' },
  { id: '2', name: 'Ceramic Pour-Over Set', price: 156, quantity: 2, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&q=80' },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const subtotal = CART_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Checkout</h1>

        {/* Progress */}
        <div className={styles.progress}>
          <div className={`${styles.progressStep} ${step >= 1 ? styles.active : ''}`}>
            <span className={styles.progressNumber}>1</span>
            <span className={styles.progressLabel}>Information</span>
          </div>
          <div className={styles.progressLine}></div>
          <div className={`${styles.progressStep} ${step >= 2 ? styles.active : ''}`}>
            <span className={styles.progressNumber}>2</span>
            <span className={styles.progressLabel}>Shipping</span>
          </div>
          <div className={styles.progressLine}></div>
          <div className={`${styles.progressStep} ${step >= 3 ? styles.active : ''}`}>
            <span className={styles.progressNumber}>3</span>
            <span className={styles.progressLabel}>Payment</span>
          </div>
        </div>

        <div className={styles.layout}>
          {/* Form */}
          <div className={styles.form}>
            {step === 1 && (
              <div className={styles.formSection}>
                <h2 className={styles.formTitle}>Contact Information</h2>
                <Input label="Email" type="email" placeholder="your@email.com" />
                <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />

                <h2 className={styles.formTitle}>Shipping Address</h2>
                <div className={styles.formRow}>
                  <Input label="First Name" placeholder="John" />
                  <Input label="Last Name" placeholder="Doe" />
                </div>
                <Input label="Company (optional)" placeholder="Company name" />
                <Input label="Address" placeholder="Street address" />
                <Input label="Apartment, suite, etc. (optional)" placeholder="Apt 4B" />
                <div className={styles.formRow}>
                  <Input label="City" placeholder="New York" />
                  <Input label="State" placeholder="NY" />
                  <Input label="ZIP Code" placeholder="10001" />
                </div>
                <Input label="Country" defaultValue="United States" />

                <div className={styles.formActions}>
                  <Link href="/cart">
                    <Button variant="ghost">Back to Cart</Button>
                  </Link>
                  <Button onClick={() => setStep(2)}>Continue to Shipping</Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className={styles.formSection}>
                <h2 className={styles.formTitle}>Shipping Method</h2>
                <div className={styles.shippingOptions}>
                  <label className={styles.shippingOption}>
                    <input type="radio" name="shipping" defaultChecked />
                    <div className={styles.shippingInfo}>
                      <span className={styles.shippingName}>Standard Shipping</span>
                      <span className={styles.shippingTime}>5-7 business days</span>
                    </div>
                    <span className={styles.shippingPrice}>Free</span>
                  </label>
                  <label className={styles.shippingOption}>
                    <input type="radio" name="shipping" />
                    <div className={styles.shippingInfo}>
                      <span className={styles.shippingName}>Express Shipping</span>
                      <span className={styles.shippingTime}>2-3 business days</span>
                    </div>
                    <span className={styles.shippingPrice}>$15</span>
                  </label>
                </div>

                <div className={styles.formActions}>
                  <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                  <Button onClick={() => setStep(3)}>Continue to Payment</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className={styles.formSection}>
                <h2 className={styles.formTitle}>Payment Method</h2>
                <div className={styles.paymentMethods}>
                  <label className={styles.paymentOption}>
                    <input type="radio" name="payment" defaultChecked />
                    <span>Credit Card</span>
                  </label>
                  <label className={styles.paymentOption}>
                    <input type="radio" name="payment" />
                    <span>PayPal</span>
                  </label>
                  <label className={styles.paymentOption}>
                    <input type="radio" name="payment" />
                    <span>Apple Pay</span>
                  </label>
                </div>

                <div className={styles.cardForm}>
                  <Input label="Card Number" placeholder="1234 5678 9012 3456" />
                  <div className={styles.formRow}>
                    <Input label="Expiry Date" placeholder="MM/YY" />
                    <Input label="CVC" placeholder="123" />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
                  <Button>Pay ${total}</Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <aside className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.summaryItems}>
              {CART_ITEMS.map((item) => (
                <div key={item.id} className={styles.summaryItem}>
                  <div className={styles.summaryItemImage}>
                    <img src={item.image} alt={item.name} />
                    <span className={styles.summaryItemQty}>{item.quantity}</span>
                  </div>
                  <div className={styles.summaryItemInfo}>
                    <span className={styles.summaryItemName}>{item.name}</span>
                  </div>
                  <span className={styles.summaryItemPrice}>${item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Tax</span>
                <span>Calculated at next step</span>
              </div>
            </div>

            <div className={styles.summaryDivider}></div>

            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span className={styles.totalAmount}>${total}</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
