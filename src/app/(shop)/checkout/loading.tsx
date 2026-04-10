import styles from './loading.module.css';

export default function CheckoutLoading() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.titleSkeleton} />
        <div className={styles.layout}>
          <div className={styles.form}>
            {[1, 2, 3].map((step) => (
              <div key={step} className={styles.stepSkeleton}>
                <div style={{ height: 24, width: 120, background: 'var(--color-secondary)', borderRadius: 6, marginBottom: 24 }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} style={{ height: 48, background: 'var(--color-secondary)', borderRadius: 8 }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <aside className={styles.summary}>
            <div style={{ height: 28, width: 140, background: 'var(--color-secondary)', borderRadius: 6, marginBottom: 24 }} />
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 60, height: 60, background: 'var(--color-secondary)', borderRadius: 8, flexShrink: 0 }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 8 }}>
                  <div style={{ height: 14, width: '80%', background: 'var(--color-secondary)', borderRadius: 4 }} />
                  <div style={{ height: 12, width: '40%', background: 'var(--color-secondary)', borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
}
