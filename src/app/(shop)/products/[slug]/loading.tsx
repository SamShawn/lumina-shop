import { ProductDetailSkeleton } from '@/components/ui/Skeleton';
import styles from './loading.module.css';

export default function ProductDetailLoading() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.breadcrumbSkeleton}>
          <div style={{ height: 14, width: 60, background: 'var(--color-secondary)', borderRadius: 4 }} />
          <div style={{ height: 14, width: 80, background: 'var(--color-secondary)', borderRadius: 4 }} />
          <div style={{ height: 14, width: 120, background: 'var(--color-secondary)', borderRadius: 4 }} />
        </div>
        <ProductDetailSkeleton />
      </div>
    </div>
  );
}
