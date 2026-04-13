'use client';

import { motion } from 'framer-motion';
import styles from './ProductTabs.module.css';

type TabKey = 'details' | 'materials' | 'care' | 'shipping';

interface ProductTabsProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
  content: Record<TabKey, string>;
}

const TABS: TabKey[] = ['details', 'materials', 'care', 'shipping'];

export function ProductTabs({ active, onChange, content }: ProductTabsProps) {
  const activeIndex = TABS.indexOf(active);

  return (
    <div className={styles.container}>
      <div className={styles.tabList} role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={active === tab}
            className={[styles.tab, active === tab ? styles.active : ''].join(' ')}
            onClick={() => onChange(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
        {/* Sliding underline indicator */}
        <motion.div
          className={styles.indicator}
          initial={false}
          animate={{ x: `calc(${activeIndex} * 100%)` }}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        />
      </div>
      <div className={styles.content} role="tabpanel">
        {content[active]}
      </div>
    </div>
  );
}
