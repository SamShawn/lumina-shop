import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';

const NAV_ITEMS = [
  { label: 'Profile', href: '/account', icon: 'user' },
  { label: 'Orders', href: '/account/orders', icon: 'package' },
  { label: 'Wishlist', href: '/account/wishlist', icon: 'heart' },
  { label: 'Addresses', href: '/account/addresses', icon: 'mapPin' },
  { label: 'Payment', href: '/account/payment', icon: 'creditCard' },
];

const RECENT_ORDERS = [
  { id: 'ORD-2026-001', date: 'Mar 15, 2026', status: 'Delivered', total: '$601', items: 2 },
  { id: 'ORD-2026-002', date: 'Mar 22, 2026', status: 'Shipped', total: '$289', items: 1 },
];

export default function AccountPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Account</h1>
        </div>

        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <nav className={styles.nav}>
              {NAV_ITEMS.map((item) => (
                <Link href={item.href} key={item.href} className={`${styles.navItem} ${item.href === '/account' ? styles.active : ''}`}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className={styles.main}>
            {/* Profile Section */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Profile</h2>
              <div className={styles.profileCard}>
                <div className={styles.profileAvatar}>
                  <span>JD</span>
                </div>
                <div className={styles.profileInfo}>
                  <h3 className={styles.profileName}>John Doe</h3>
                  <p className={styles.profileEmail}>john.doe@example.com</p>
                  <p className={styles.profileMember}>Member since March 2026</p>
                </div>
                <Button variant="outline" size="sm">Edit Profile</Button>
              </div>
            </section>

            {/* Quick Links */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Recent Orders</h2>
                <Link href="/account/orders" className={styles.viewAll}>View All</Link>
              </div>
              <div className={styles.ordersList}>
                {RECENT_ORDERS.map((order) => (
                  <div key={order.id} className={styles.orderCard}>
                    <div className={styles.orderInfo}>
                      <span className={styles.orderId}>{order.id}</span>
                      <span className={styles.orderDate}>{order.date}</span>
                    </div>
                    <div className={styles.orderDetails}>
                      <span className={styles.orderItems}>{order.items} items</span>
                      <span className={styles.orderTotal}>{order.total}</span>
                    </div>
                    <span className={`${styles.orderStatus} ${styles[order.status.toLowerCase()]}`}>
                      {order.status}
                    </span>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </section>

            {/* Wishlist Preview */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Wishlist</h2>
                <Link href="/account/wishlist" className={styles.viewAll}>View All</Link>
              </div>
              <div className={styles.wishlistGrid}>
                <div className={styles.wishlistItem}>
                  <img src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=200&q=80" alt="Product" />
                  <Button variant="ghost" size="sm" className={styles.wishlistRemove}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 6 6 18M6 6l12 12"/>
                    </svg>
                  </Button>
                </div>
                <div className={styles.wishlistItem}>
                  <img src="https://images.unsplash.com/photo-1602607714066-4908c9a0a2b5?w=200&q=80" alt="Product" />
                  <Button variant="ghost" size="sm" className={styles.wishlistRemove}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 6 6 18M6 6l12 12"/>
                    </svg>
                  </Button>
                </div>
                <div className={styles.wishlistItem}>
                  <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=200&q=80" alt="Product" />
                  <Button variant="ghost" size="sm" className={styles.wishlistRemove}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 6 6 18M6 6l12 12"/>
                    </svg>
                  </Button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
