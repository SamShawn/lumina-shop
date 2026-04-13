'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore, useUIStore } from '@/stores';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/collections', label: 'Collections' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const pathname = usePathname();
  const { items } = useCartStore();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, theme, setTheme, resolvedTheme } = useUIStore();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Apply stored theme on mount
    const stored = localStorage.getItem('lumina-ui');
    if (stored) {
      try {
        const { theme: storedTheme } = JSON.parse(stored);
        if (storedTheme) setTheme(storedTheme as 'light' | 'dark' | 'system');
      } catch {}
    }
  }, [setTheme]);

  // Scroll state for backdrop blur
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  function handleThemeToggle() {
    const next: 'light' | 'dark' | 'system' =
      theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(next);
  }

  return (
    <>
      <header className={[styles.header, scrolled ? styles.headerScrolled : ''].join(' ')}>
        <div className={styles.container}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="Lumina home">
            <span className={styles.logoMark}>L</span>
            <span className={styles.logoText}>Lumina</span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.nav} aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className={styles.actions}>
            {/* Theme Toggle */}
            {mounted && (
              <button
                className={styles.iconButton}
                onClick={handleThemeToggle}
                aria-label={`Current theme: ${resolvedTheme}. Click to change.`}
              >
                {resolvedTheme === 'dark' ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <circle cx="12" cy="12" r="4"/>
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                )}
              </button>
            )}

            {/* Search */}
            <button className={styles.iconButton} aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            {/* Account */}
            <Link href="/account" className={styles.iconButton} aria-label="Account">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>

            {/* Cart */}
            <Link href="/cart" className={styles.iconButton} aria-label={`Cart, ${itemCount} items`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {itemCount > 0 && (
                <span className={styles.cartBadge} aria-hidden>{itemCount > 9 ? '9+' : itemCount}</span>
              )}
            </Link>

            {/* Mobile Hamburger */}
            <button
              className={styles.hamburger}
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.open : ''}`} />
              <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.open : ''}`} />
              <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.open : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.mobileOverlayOpen : ''}`}
        aria-hidden={!isMobileMenuOpen}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu Drawer */}
      <nav
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className={styles.mobileMenuHeader}>
          <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
            <span className={styles.logoMark}>L</span>
            <span className={styles.logoText}>Lumina</span>
          </Link>
          <button
            className={styles.mobileClose}
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className={styles.mobileNav}>
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileNavLink} ${isMobileMenuOpen ? styles.mobileNavLinkVisible : ''}`}
              style={{ animationDelay: isMobileMenuOpen ? `${i * 60}ms` : '0ms' }}
              onClick={closeMobileMenu}
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className={styles.mobileActions}>
          <button
            className={styles.mobileThemeToggle}
            onClick={handleThemeToggle}
            aria-label={`Switch theme (currently ${resolvedTheme})`}
          >
            {resolvedTheme === 'dark' ? (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
                <span>Dark Mode</span>
              </>
            )}
          </button>

          <Link href="/account" className={styles.mobileNavLink} onClick={closeMobileMenu} tabIndex={isMobileMenuOpen ? 0 : -1}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>Account</span>
          </Link>

          <Link href="/cart" className={styles.mobileNavLink} onClick={closeMobileMenu} tabIndex={isMobileMenuOpen ? 0 : -1}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
              <path d="M3 6h18"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span>Cart ({itemCount})</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
