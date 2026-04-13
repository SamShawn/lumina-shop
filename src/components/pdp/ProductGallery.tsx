'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProductGallery.module.css';

interface GalleryImage {
  url: string;
  alt?: string;
}

interface ProductGalleryProps {
  images: GalleryImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  function handleThumbnailKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, images.length - 1));
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
  }

  return (
    <div className={styles.gallery}>
      {/* Main image — first in DOM for semantic correctness (visually above on mobile) */}
      <div className={styles.main}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className={styles.mainImageWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <Image
              src={images[activeIndex].url}
              alt={images[activeIndex].alt || `${productName} - image ${activeIndex + 1}`}
              fill
              priority={activeIndex === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail strip — second in DOM, visually below on mobile via CSS order */}
      <div className={styles.thumbs} role="group" aria-label="Product image thumbnails">
        {images.map((img, index) => (
          <button
            key={index}
            className={[styles.thumb, index === activeIndex ? styles.thumbActive : ''].join(' ')}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(e) => handleThumbnailKeyDown(e, index)}
            aria-label={`View image ${index + 1} of ${images.length}`}
            aria-pressed={index === activeIndex}
            tabIndex={index === activeIndex ? 0 : -1}
          >
            <Image
              src={img.url}
              alt={img.alt || `${productName} view ${index + 1}`}
              fill
              sizes="60px"
              style={{ objectFit: 'cover' }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}