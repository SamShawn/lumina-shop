import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import styles from './page.module.css';

const CART_ITEMS = [
  {
    id: '1',
    name: 'Minimal Desk Lamp',
    slug: 'minimal-desk-lamp',
    price: '$289',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&q=80',
  },
  {
    id: '2',
    name: 'Ceramic Pour-Over Set',
    slug: 'ceramic-pour-over-set',
    price: '$156',
    comparePrice: '$195',
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&q=80',
  },
];

export default function CartPage() {
  const subtotal = CART_ITEMS.reduce((sum, item) => {
    const price = parseInt(item.price.replace('$', ''));
    return sum + price * item.quantity;
  }, 0);

  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Shopping Cart</h1>

        <div className={styles.layout}>
          {/* Cart Items */}
          <div className={styles.items}>
            {CART_ITEMS.length === 0 ? (
              <div className={styles.empty}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
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
            ) : (
              <>
                <div className={styles.itemsHeader}>
                  <span>Product</span>
                  <span>Quantity</span>
                  <span>Total</span>
                </div>
                <div className={styles.itemsList}>
                  {CART_ITEMS.map((item) => (
                    <div key={item.id} className={styles.item}>
                      <div className={styles.itemProduct}>
                        <img src={item.image} alt={item.name} className={styles.itemImage} />
                        <div className={styles.itemInfo}>
                          <Link href={`/products/${item.slug}`} className={styles.itemName}>
                            {item.name}
                          </Link>
                          <div className={styles.itemPrice}>
                            <span className={styles.itemCurrentPrice}>{item.price}</span>
                            {item.comparePrice && (
                              <span className={styles.itemComparePrice}>{item.comparePrice}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={styles.itemQuantity}>
                        <button className={styles.quantityBtn} aria-label="Decrease">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14"/>
                          </svg>
                        </button>
                        <span className={styles.quantityValue}>{item.quantity}</span>
                        <button className={styles.quantityBtn} aria-label="Increase">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 5v14M5 12h14"/>
                          </svg>
                        </button>
                      </div>
                      <div className={styles.itemTotal}>
                        ${parseInt(item.price.replace('$', '')) * item.quantity}
                      </div>
                      <button className={styles.itemRemove} aria-label="Remove item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M18 6 6 18M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className={styles.itemsFooter}>
                  <Link href="/products">
                    <Button variant="ghost">Continue Shopping</Button>
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Summary */}
          <aside className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <p className={styles.freeShippingNote}>
                  Add ${200 - subtotal} more for free shipping
                </p>
              )}
            </div>

            <div className={styles.coupon}>
              <Input placeholder="Coupon code" />
              <Button variant="outline">Apply</Button>
            </div>

            <div className={styles.summaryDivider}></div>

            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span className={styles.totalAmount}>${total}</span>
            </div>

            <Link href="/checkout">
              <Button size="lg" className={styles.checkoutBtn}>Proceed to Checkout</Button>
            </Link>

            <div className={styles.secureNote}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
