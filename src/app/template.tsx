'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './template.module.css';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    // Trigger animation on every navigation
    setIsEntering(true);
    const t = setTimeout(() => setIsEntering(false), 350);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div className={`${styles.page} ${isEntering ? styles.entering : styles.entered}`}>
      {children}
    </div>
  );
}
