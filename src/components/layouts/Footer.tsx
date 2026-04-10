import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoMark}>L</span>
              <span className={styles.logoText}>Lumina</span>
            </Link>
            <p className={styles.tagline}>
              Curated luxury for the modern connoisseur. Discover exceptional pieces crafted with precision and purpose.
            </p>
            <div className={styles.social}>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="18" cy="6" r="1"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Pinterest">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4c0 2.5-2 4-4 6l-1-4"/>
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Shop</h4>
              <Link href="/products" className={styles.link}>All Products</Link>
              <Link href="/collections" className={styles.link}>Collections</Link>
              <Link href="/new" className={styles.link}>New Arrivals</Link>
              <Link href="/bestsellers" className={styles.link}>Bestsellers</Link>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Company</h4>
              <Link href="/about" className={styles.link}>About Us</Link>
              <Link href="/contact" className={styles.link}>Contact</Link>
              <Link href="/careers" className={styles.link}>Careers</Link>
              <Link href="/press" className={styles.link}>Press</Link>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Support</h4>
              <Link href="/help" className={styles.link}>Help Center</Link>
              <Link href="/shipping" className={styles.link}>Shipping</Link>
              <Link href="/returns" className={styles.link}>Returns</Link>
              <Link href="/faq" className={styles.link}>FAQ</Link>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            2026 Lumina. All rights reserved.
          </p>
          <div className={styles.legal}>
            <Link href="/privacy" className={styles.legalLink}>Privacy</Link>
            <Link href="/terms" className={styles.legalLink}>Terms</Link>
            <Link href="/cookies" className={styles.legalLink}>Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
