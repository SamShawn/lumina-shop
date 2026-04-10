import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import styles from './loading.module.css';

export default function ProductsLoading() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleSkeleton} />
          <div className={styles.subtitleSkeleton} />
        </div>
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.filterGroup}>
              <div className={styles.filterTitleSkeleton} />
              <div className={styles.filterOptionsSkeleton} />
              <div className={styles.filterOptionsSkeleton} />
              <div className={styles.filterOptionsSkeleton} />
              <div className={styles.filterOptionsSkeleton} />
            </div>
          </aside>
          <div className={styles.main}>
            <ProductGridSkeleton count={8} />
          </div>
        </div>
      </div>
    </div>
  );
}
