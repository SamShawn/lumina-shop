import { CartItemSkeleton } from '@/components/ui/Skeleton';
import styles from './loading.module.css';

export default function CartLoading() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.titleSkeleton} />
        <div className={styles.layout}>
          <div className={styles.items}>
            <div className={styles.itemsHeader}>
              <div style={{ height: 14, width: 80, background: 'var(--color-secondary)', borderRadius: 4 }} />
              <div style={{ height: 14, width: 60, background: 'var(--color-secondary)', borderRadius: 4 }} />
              <div style={{ height: 14, width: 40, background: 'var(--color-secondary)', borderRadius: 4 }} />
            </div>
            <CartItemSkeleton />
            <CartItemSkeleton />
          </div>
          <aside className={styles.summary}>
            <div style={{ height: 28, width: 160, background: 'var(--color-secondary)', borderRadius: 6, marginBottom: 24 }} />
            <div style={{ height: 16, width: '100%', background: 'var(--color-secondary)', borderRadius: 4, marginBottom: 12 }} />
            <div style={{ height: 16, width: '80%', background: 'var(--color-secondary)', borderRadius: 4, marginBottom: 12 }} />
            <div style={{ height: 16, width: '60%', background: 'var(--color-secondary)', borderRadius: 4, marginBottom: 24 }} />
            <div style={{ height: 48, width: '100%', background: 'var(--color-secondary)', borderRadius: 8 }} />
          </aside>
        </div>
      </div>
    </div>
  );
}
