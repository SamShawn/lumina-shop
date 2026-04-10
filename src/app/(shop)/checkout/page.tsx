'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCartStore } from '@/stores';
import { checkoutSchema } from '@/lib/validation';
import type { z } from 'zod';
import styles from './page.module.css';

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CART_ITEMS = [
  { id: '1', name: 'Minimal Desk Lamp', price: 28900, quantity: 1, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&q=80' },
  { id: '2', name: 'Ceramic Pour-Over Set', price: 15600, quantity: 2, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&q=80' },
];

const STEP1_FIELDS: (keyof CheckoutFormData)[] = ['email', 'phone', 'firstName', 'lastName', 'address', 'apartment', 'city', 'state', 'zip', 'country'];
const STEP3_FIELDS: (keyof CheckoutFormData)[] = ['cardNumber', 'expiry', 'cvc'];

export default function CheckoutPage() {
  const router = useRouter();
  const { items } = useCartStore();
  const cartItems = items.length > 0 ? items.map(i => ({ id: i.product.id, name: i.product.name, price: i.product.price, quantity: i.quantity, image: i.product.images[0]?.url ?? '' })) : CART_ITEMS;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<CheckoutFormData>>({});
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 10000 ? 0 : 995;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  function validateField(field: string, value: string) {
    const schema = checkoutSchema.shape[field as keyof CheckoutFormData];
    if (!schema) return;
    const result = schema.safeParse(value);
    if (!result.success) {
      setErrors((prev) => ({ ...prev, [field]: result.error.issues[0].message }));
    } else {
      setErrors((prev) => { const { [field]: _, ...rest } = prev; return rest; });
    }
  }

  function handleChange(field: keyof CheckoutFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) validateField(field, value);
  }

  function validateStep1(): boolean {
    const stepFields: (keyof CheckoutFormData)[] = ['email', 'phone', 'firstName', 'lastName', 'address', 'city', 'state', 'zip', 'country'];
    const result = checkoutSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<string, string>> = {};
      for (const err of result.error.issues) {
        const field = err.path[0] as string;
        if (stepFields.includes(field as keyof CheckoutFormData) && !fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      }
      setErrors(fieldErrors);
      return false;
    }
    return true;
  }

  function validateStep3(): boolean {
    const result = checkoutSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<string, string>> = {};
      for (const err of result.error.issues) {
        const field = err.path[0] as string;
        if (STEP3_FIELDS.includes(field as keyof CheckoutFormData) && !fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      }
      setErrors(fieldErrors);
      return false;
    }
    return true;
  }

  async function handleContinue() {
    setServerError('');
    if (step === 1 && !validateStep1()) return;
    setStep((s) => s + 1);
  }

  async function handlePayment(e: React.FormEvent) {
    e.preventDefault();
    setServerError('');
    if (!validateStep3()) return;

    setLoading(true);
    try {
      // In production, call Stripe checkout or create order
      // For now, redirect to success
      router.push('/checkout/success');
    } catch {
      setServerError('Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Checkout</h1>

        {/* Progress */}
        <div className={styles.progress} role="list" aria-label="Checkout progress">
          <div className={`${styles.progressStep} ${step >= 1 ? styles.active : ''}`} role="listitem">
            <span className={styles.progressNumber} aria-current={step === 1 ? 'step' : undefined}>1</span>
            <span className={styles.progressLabel}>Information</span>
          </div>
          <div className={styles.progressLine} aria-hidden />
          <div className={`${styles.progressStep} ${step >= 2 ? styles.active : ''}`} role="listitem">
            <span className={styles.progressNumber} aria-current={step === 2 ? 'step' : undefined}>2</span>
            <span className={styles.progressLabel}>Shipping</span>
          </div>
          <div className={styles.progressLine} aria-hidden />
          <div className={`${styles.progressStep} ${step >= 3 ? styles.active : ''}`} role="listitem">
            <span className={styles.progressNumber} aria-current={step === 3 ? 'step' : undefined}>3</span>
            <span className={styles.progressLabel}>Payment</span>
          </div>
        </div>

        <div className={styles.layout}>
          {/* Form */}
          <div className={styles.form}>
            {step === 1 && (
              <div className={styles.formSection}>
                <h2 className={styles.formTitle}>Contact Information</h2>
                <Input
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email ?? ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => validateField('email', formData.email ?? '')}
                  error={errors.email}
                  autoComplete="email"
                />
                <Input
                  label="Phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone ?? ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  onBlur={() => validateField('phone', formData.phone ?? '')}
                  error={errors.phone}
                  autoComplete="tel"
                />

                <h2 className={styles.formTitle}>Shipping Address</h2>
                <div className={styles.formRow}>
                  <Input
                    label="First Name"
                    placeholder="John"
                    value={formData.firstName ?? ''}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    onBlur={() => validateField('firstName', formData.firstName ?? '')}
                    error={errors.firstName}
                    autoComplete="given-name"
                  />
                  <Input
                    label="Last Name"
                    placeholder="Doe"
                    value={formData.lastName ?? ''}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    onBlur={() => validateField('lastName', formData.lastName ?? '')}
                    error={errors.lastName}
                    autoComplete="family-name"
                  />
                </div>
                <Input
                  label="Company (optional)"
                  placeholder="Company name"
                  autoComplete="organization"
                />
                <Input
                  label="Address"
                  placeholder="Street address"
                  value={formData.address ?? ''}
                  onChange={(e) => handleChange('address', e.target.value)}
                  onBlur={() => validateField('address', formData.address ?? '')}
                  error={errors.address}
                  autoComplete="street-address"
                />
                <Input
                  label="Apartment, suite, etc. (optional)"
                  placeholder="Apt 4B"
                  value={formData.apartment ?? ''}
                  onChange={(e) => handleChange('apartment', e.target.value)}
                  autoComplete="address-line2"
                />
                <div className={styles.formRow}>
                  <Input
                    label="City"
                    placeholder="New York"
                    value={formData.city ?? ''}
                    onChange={(e) => handleChange('city', e.target.value)}
                    onBlur={() => validateField('city', formData.city ?? '')}
                    error={errors.city}
                    autoComplete="address-level2"
                  />
                  <Input
                    label="State"
                    placeholder="NY"
                    value={formData.state ?? ''}
                    onChange={(e) => handleChange('state', e.target.value)}
                    onBlur={() => validateField('state', formData.state ?? '')}
                    error={errors.state}
                    autoComplete="address-level1"
                  />
                  <Input
                    label="ZIP Code"
                    placeholder="10001"
                    value={formData.zip ?? ''}
                    onChange={(e) => handleChange('zip', e.target.value)}
                    onBlur={() => validateField('zip', formData.zip ?? '')}
                    error={errors.zip}
                    autoComplete="postal-code"
                  />
                </div>
                <Input
                  label="Country"
                  placeholder="United States"
                  value={formData.country ?? ''}
                  onChange={(e) => handleChange('country', e.target.value)}
                  onBlur={() => validateField('country', formData.country ?? '')}
                  error={errors.country}
                  autoComplete="country-name"
                />

                {serverError && <p className={styles.error} role="alert">{serverError}</p>}

                <div className={styles.formActions}>
                  <Link href="/cart">
                    <Button variant="ghost">Back to Cart</Button>
                  </Link>
                  <Button onClick={handleContinue}>Continue to Shipping</Button>
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
                  <Button onClick={handleContinue}>Continue to Payment</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form className={styles.formSection} onSubmit={handlePayment} noValidate>
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
                  <Input
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber ?? ''}
                    onChange={(e) => handleChange('cardNumber', e.target.value)}
                    onBlur={() => validateField('cardNumber', formData.cardNumber ?? '')}
                    error={errors.cardNumber}
                    autoComplete="cc-number"
                  />
                  <div className={styles.formRow}>
                    <Input
                      label="Expiry Date"
                      placeholder="MM/YY"
                      value={formData.expiry ?? ''}
                      onChange={(e) => handleChange('expiry', e.target.value)}
                      onBlur={() => validateField('expiry', formData.expiry ?? '')}
                      error={errors.expiry}
                      autoComplete="cc-exp"
                    />
                    <Input
                      label="CVC"
                      placeholder="123"
                      value={formData.cvc ?? ''}
                      onChange={(e) => handleChange('cvc', e.target.value)}
                      onBlur={() => validateField('cvc', formData.cvc ?? '')}
                      error={errors.cvc}
                      autoComplete="cc-csc"
                    />
                  </div>
                </div>

                {serverError && <p className={styles.error} role="alert">{serverError}</p>}

                <div className={styles.formActions}>
                  <Button variant="ghost" type="button" onClick={() => setStep(2)}>Back</Button>
                  <Button type="submit" isLoading={loading} disabled={loading}>
                    Pay ${(total / 100).toFixed(2)}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <aside className={styles.summary} aria-label="Order summary">
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.summaryItems}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.summaryItem}>
                  <div className={styles.summaryItemImage}>
                    <Image src={item.image} alt={item.name} fill sizes="56px" style={{ objectFit: 'cover' }} />
                    <span className={styles.summaryItemQty}>{item.quantity}</span>
                  </div>
                  <div className={styles.summaryItemInfo}>
                    <span className={styles.summaryItemName}>{item.name}</span>
                  </div>
                  <span className={styles.summaryItemPrice}>${((item.price * item.quantity) / 100).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${(subtotal / 100).toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${(shipping / 100).toFixed(2)}`}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Tax</span>
                <span>${(tax / 100).toFixed(2)}</span>
              </div>
            </div>

            <div className={styles.summaryDivider} />

            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span className={styles.totalAmount}>${(total / 100).toFixed(2)}</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
