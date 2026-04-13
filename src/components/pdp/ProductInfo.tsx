'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Badge } from '@/components/design-system';
import { OptionSelector } from './OptionSelector';
import { ProductTabs } from './ProductTabs';
import { AddToCartButton } from './AddToCartButton';
import { MakerCredit } from './MakerCredit';
import styles from './ProductInfo.module.css';

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    comparePrice?: number;
    description?: string;
    stock?: number;
    category?: { name: string };
    images: { url: string; alt?: string }[];
    maker?: { name: string; location?: string };
    options?: { name: string; values: string[] }[];
  };
  onAddToCart: () => void;
}

const TAB_CONTENT = {
  details: 'Details about this piece will be added here.',
  materials: 'Materials: stoneware clay, natural glaze compounds.',
  care: 'Care: hand wash recommended. Avoid microwave.',
  shipping: 'Ships within 5–7 business days. Free returns within 30 days.',
};

export function ProductInfo({ product, onAddToCart }: ProductInfoProps) {
  const [activeTab, setActiveTab] = useState<keyof typeof TAB_CONTENT>('details');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    Object.fromEntries((product.options || []).map(opt => [opt.name, opt.values[0]]))
  );

  const hasMultipleOptions = (product.options || []).length > 0;

  return (
    <motion.div
      className={styles.info}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Category + name */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {product.category && (
          <span className={styles.category}>
            {product.category.name}
          </span>
        )}
        <h1 className={styles.title}>{product.name}</h1>
        <span className={styles.price}>
          ${(product.price / 100).toFixed(2)}
        </span>
      </motion.div>

      {/* Description */}
      {product.description && (
        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {product.description}
        </motion.p>
      )}

      {/* Visual divider */}
      <motion.div
        className={styles.divider}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.35, duration: 0.3 }}
      />

      {/* Options */}
      {hasMultipleOptions && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {product.options?.map((opt) => (
            <div key={opt.name} className={styles.optionGroup}>
              <span className={styles.optionLabel}>{opt.name}</span>
              <OptionSelector
                options={opt.values}
                selected={selectedOptions[opt.name]}
                onChange={(value) => setSelectedOptions(prev => ({ ...prev, [opt.name]: value }))}
              />
            </div>
          ))}
        </motion.div>
      )}

      {/* Add to cart */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <AddToCartButton onClick={onAddToCart} stock={product.stock} />
      </motion.div>

      {/* Maker credit */}
      {product.maker && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <MakerCredit maker={product.maker} />
        </motion.div>
      )}

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
      >
        <ProductTabs
          active={activeTab}
          onChange={setActiveTab}
          content={TAB_CONTENT}
        />
      </motion.div>
    </motion.div>
  );
}
