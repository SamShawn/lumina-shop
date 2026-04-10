import styles from './loading.module.css';

export default function LoginLoading() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div style={{ width: 48, height: 48, background: 'var(--color-secondary)', borderRadius: 12, margin: '0 auto var(--space-6)' }} />
            <div style={{ height: 32, width: 180, background: 'var(--color-secondary)', borderRadius: 6, margin: '0 auto var(--space-3)' }} />
            <div style={{ height: 16, width: 240, background: 'var(--color-secondary)', borderRadius: 4 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ height: 48, background: 'var(--color-secondary)', borderRadius: 8 }} />
            <div style={{ height: 48, background: 'var(--color-secondary)', borderRadius: 8 }} />
            <div style={{ height: 48, background: 'var(--color-secondary)', borderRadius: 8 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
