import styles from './loading.module.css';

export default function AccountLoading() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div style={{ width: 80, height: 80, background: 'var(--color-secondary)', borderRadius: '50%' }} />
          <div style={{ flex: 1 }}>
            <div style={{ height: 24, width: 160, background: 'var(--color-secondary)', borderRadius: 6, marginBottom: 8 }} />
            <div style={{ height: 16, width: 200, background: 'var(--color-secondary)', borderRadius: 4 }} />
          </div>
        </div>
        <div className={styles.navSkeleton}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ height: 40, background: 'var(--color-secondary)', borderRadius: 8 }} />
          ))}
        </div>
        <div className={styles.content}>
          <div style={{ height: 28, width: 140, background: 'var(--color-secondary)', borderRadius: 6, marginBottom: 24 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ height: 120, background: 'var(--color-secondary)', borderRadius: 12 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
