import styles from './loading.module.css';

export default function GlobalLoading() {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner} aria-label="Loading" />
    </div>
  );
}
