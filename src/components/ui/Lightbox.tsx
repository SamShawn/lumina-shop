'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useUIStore } from '@/stores';
import styles from './Lightbox.module.css';

export function Lightbox() {
  const { lightbox, closeLightbox, nextLightboxImage, prevLightboxImage } = useUIStore();
  const { isOpen, images, currentIndex } = lightbox;
  const [fading, setFading] = useState(false);

  const handleNext = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      nextLightboxImage();
      setFading(false);
    }, 180);
  }, [nextLightboxImage]);

  const handlePrev = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      prevLightboxImage();
      setFading(false);
    }, 180);
  }, [prevLightboxImage]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeLightbox, handleNext, handlePrev]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className={`${styles.backdrop} ${isOpen ? styles.open : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      onClick={closeLightbox}
    >
      {/* Close */}
      <button
        className={styles.closeBtn}
        onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
        aria-label="Close lightbox"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          className={`${styles.navBtn} ${styles.prev}`}
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          aria-label="Previous image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      )}

      {/* Image */}
      <div
        className={styles.imageContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.imageWrapper}>
          <Image
            src={currentImage.url}
            alt={currentImage.alt ?? `Product image ${currentIndex + 1}`}
            fill
            sizes="90vw"
            className={`${styles.image} ${fading ? styles.fading : ''}`}
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          className={`${styles.navBtn} ${styles.next}`}
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          aria-label="Next image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      )}

      {/* Counter */}
      {images.length > 1 && (
        <div className={styles.counter} aria-live="polite" aria-atomic="true">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div
          className={styles.thumbnails}
          role="list"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              role="listitem"
              className={`${styles.thumbnail} ${idx === currentIndex ? styles.active : ''}`}
              onClick={() => {
                if (idx !== currentIndex) {
                  setFading(true);
                  setTimeout(() => {
                    useUIStore.getState().lightbox.currentIndex !== idx &&
                      useUIStore.setState((s) => ({ lightbox: { ...s.lightbox, currentIndex: idx } }));
                    setFading(false);
                  }, 180);
                }
              }}
              aria-label={`View image ${idx + 1}`}
              aria-pressed={idx === currentIndex}
            >
              <Image
                src={img.url}
                alt={img.alt ?? `Thumbnail ${idx + 1}`}
                fill
                sizes="56px"
                style={{ objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
